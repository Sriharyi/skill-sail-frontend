import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ProjectCreateRequest, ProjectForm } from 'src/app/shared/models/employer/project-create';
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

  public projectForm: FormGroup<ProjectForm>;
  skillsList: string[] = [];
  categoriesList: string[] = CATEGORIES;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private fb: FormBuilder, private projectService: ProjectService, private skillService: SkillService, private router: Router) {
    this.projectForm = this.createProjectForm();

  }

  ngOnInit(): void {
    this.projectForm.get('category')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        {
          next: (value) => {
            if (value) {
              this.skillService.getSkillsByCategory(value).subscribe(
                {
                  next: (value) => {
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

  createProjectForm(): FormGroup<ProjectForm> {
    return this.fb.group<ProjectForm>({
      title: this.fb.control(""),
      description: this.fb.control(""),
      category: this.fb.control(""),
      skills: this.fb.control([]),
      budget: this.fb.control(null),
      deadline: this.fb.control(null),
      bidDeadline: this.fb.control(null),
    });
  }

  onSubmit() {
    const request: ProjectCreateRequest = this.projectForm.value as ProjectCreateRequest;
    this.projectService.createProject(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        {
          next: (value) => {
            Swal.fire({
              title: 'Success!',
              text: 'Project created successfully',
              icon: 'success',
              confirmButtonText: 'Ok'
            }).then(() => {
              this.router.navigate(['/employer/projects'], { queryParams: { status: 'open' } });
            });
          },
          error: (error) => {
            console.log(error);
          }
        }
      );
  }

}
