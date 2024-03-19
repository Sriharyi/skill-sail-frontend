import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ProjectCreateRequest, ProjectDetailForm, ProjectInfoForm,  } from 'src/app/shared/models/employer/project-create';
import Swal from "sweetalert2";
import { CATEGORIES } from "../../../../core/constants/constants";
import { SkillService } from "../../../../core/services/admin/skill.service";
import { ProjectService } from "../../../../core/services/employer/project.service";
import { SkillDto } from "../../../../shared/models/admin/skill-dto";
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {


  projectInfoForm: FormGroup<ProjectInfoForm>;
  projectDetailForm: FormGroup<ProjectDetailForm>;
  skillsList: string[] = [];
  categoriesList: string[] = CATEGORIES;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  isLinear: boolean = false;
  public projectFile : File | null = null;
  public projectThumbnail : File | null = null;

  constructor(private fb: FormBuilder, private projectService: ProjectService, private skillService: SkillService, private router: Router) {
    this.projectInfoForm = this.createProjectInfoForm();
    this.projectDetailForm = this.createProjectDetailForm();
  }

  ngOnInit(): void {
    this.projectInfoForm.get('category')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        {
          next: (value) => {
            if (value) {
              this.skillService.getSkillsByCategory(value).subscribe(
                {
                  next: (value) => {
                    this.skillsList = [];
                    value.forEach((skill: SkillDto) => {
                      this.skillsList.push(skill.skillName);
                    });
                  },
                  error: (error) => {
                    console.log(error);
                  }
                }
              );
            }
          },
          error: (error) => {
            console.log(error);
          }
        }
      );
  }

  createProjectInfoForm(): FormGroup<ProjectInfoForm> {
    return this.fb.group<ProjectInfoForm>({
      title: this.fb.control("",Validators.required),
      category: this.fb.control("",Validators.required),
      skills: this.fb.control([],Validators.required),
      file: this.fb.control(null,Validators.required)
    });
  }

  createProjectDetailForm(): FormGroup<ProjectDetailForm> {
    return this.fb.group<ProjectDetailForm>({
      budget: this.fb.control(null,Validators.required),
      deadline: this.fb.control(null,Validators.required),
      bidDeadline: this.fb.control(null,Validators.required),
      thumbnail: this.fb.control(null,Validators.required)
    });
  }

 
  onFileSelected($event: Event) {
    const file = ($event.target as HTMLInputElement).files![0];
    if(file.size > 5000000){
      Swal.fire({
        title: 'Error!',
        text: 'File size should be less than 5MB',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      this.projectInfoForm.patchValue({
        file: null
      });
      return;
    }
    if(file.type !== 'application/pdf'){
      Swal.fire({
        title: 'Error!',
        text: 'File type should be pdf',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      this.projectInfoForm.patchValue({
        file: null
      });
      return;
    }
    this.projectFile = file;
  } 

  onThumbnailSelected($event: Event) {
    const file = ($event.target as HTMLInputElement).files![0];
    if(file.size > 5000000){
      Swal.fire({
        title: 'Error!',
        text: 'File size should be less than 5MB',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      this.projectDetailForm.patchValue({
        thumbnail: null
      });
      return;
    }
    if(file.type !== 'image/jpeg' && file.type !== 'image/png'){
      Swal.fire({
        title: 'Error!',
        text: 'File type should be jpeg or png',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      this.projectDetailForm.patchValue({
        thumbnail: null
      });
      return;
    }
    this.projectThumbnail = file;
  }


  onSubmit() {
    if(this.projectInfoForm.invalid || this.projectDetailForm.invalid){
      Swal.fire({
        title: 'Error!',
        text: 'Please fill all the required fields',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }
    const {file,...restInfo} = this.projectInfoForm.value;
    const {thumbnail,...restDetail} = this.projectDetailForm.value;
    const projectData =   {
      ...restInfo,
      ...restDetail,
      employerProfileId: ''
    } as ProjectCreateRequest;

    if (this.projectFile && this.projectThumbnail) {
      this.projectService.createProject(projectData, this.projectFile, this.projectThumbnail)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          {
            next: (value) => {
              console.log(value);
              // Swal.fire({
              //   title: 'Success!',
              //   text: 'Project created successfully',
              //   icon: 'success',
              //   confirmButtonText: 'Ok'
              // }).then(() => {
              //   this.router.navigate(['/employer/projects'], { queryParams: { status: 'open' } });
              // });
            },
            error: (error) => {
              console.log(error);
            }
          }
        );
    }
  }

}
