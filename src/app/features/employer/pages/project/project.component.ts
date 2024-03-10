import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {ProjectCreateRequest, ProjectForm} from 'src/app/shared/models/employer/project-create';
import {SkillService} from "../../../../core/services/admin/skill.service";
import {ProjectService} from "../../../../core/services/employer/project.service";
import {CATEGORIES} from "../../../../core/constants/constants";
import {SkillDto} from "../../../../shared/models/admin/skill-dto";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

  public projectForm: FormGroup<ProjectForm>;
  skillsList: string[] = [];
  categoriesList: string[] = CATEGORIES;

  constructor( private fb:FormBuilder,private projectService:ProjectService,private skillService:SkillService) {
    this.projectForm = this.createProjectForm();

  }

  ngOnInit(): void {
      this.projectForm.get('category')?.valueChanges.subscribe(
        {
          next: (value) => {
              if(value){
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
    const request:ProjectCreateRequest = this.projectForm.value as ProjectCreateRequest;
    this.projectService.createProject(request).subscribe(
      {
        next: (value) => {
          console.log(value);
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  // resetForm() {
  //   this.projectForm.reset();
  // }
}
