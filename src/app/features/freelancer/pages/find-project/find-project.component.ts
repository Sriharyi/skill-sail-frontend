import { Component } from '@angular/core';
import { ProjectService } from "../../../../core/services/employer/project.service";
import { Page, ProjectResponse } from "../../../../shared/models/employer/project-create";
import { Project } from "../../../../shared/models/freelancer/project";
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-project',
  templateUrl: './find-project.component.html',
  styleUrls: ['./find-project.component.scss']
})
export class FindProjectComponent {
 
  first: number = 0;
  rows: number = 12;
  totalrecords: number = 60;
  searchTerm: any;
  projects: Project[] = [];

  constructor(private projectService: ProjectService,private router: Router) {

  }

  ngOnInit() {
    this.loadProjects(this.first, this.rows); 
  }


  loadProjects(page: number, rows: number) {
    this.projectService.getPaginatedProjects(page, rows).subscribe({
      next: (response: Page<ProjectResponse>) => {
        this.projects = response.content.map((project) => Project.fromJson(project));
        this.totalrecords = response.totalElements;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  search() {
    this.loadSearchProjects(this.searchTerm, this.first, this.rows);
  }

  loadSearchProjects(searchText: any, first: number, rows: number) {
    this.projectService.searchProjects(searchText, first, rows).subscribe({
      next: (response: Page<ProjectResponse>) => {
        this.projects = response.content.map((project) => Project.fromJson(project));
        this.totalrecords = response.totalElements;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onPageChange($event: any) {
    if (this.searchTerm) {
      this.loadSearchProjects(this.searchTerm, $event.first, $event.rows);
    } else {
      this.loadProjects($event.page, $event.rows);
    }
  }

  ///freelancer/project/{{ project.id }}">
  openProject(project: Project) {
    this.router.navigate(['freelancer/project', project.id]);
  }
}
