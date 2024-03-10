import { Component } from '@angular/core';
import {ProjectService} from "../../../../core/services/employer/project.service";
import {ProjectResponse} from "../../../../shared/models/employer/project-create";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.scss']
})
export class ViewProjectsComponent {

  public projects: ProjectResponse[] = [];

  public projectStatus : string = "";
  constructor(private projectService:ProjectService,private router: Router,private route: ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
             this.projectStatus = params['status'];
             this.loadProjects();
        });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this.projectService.getProjectsByEmployerId().subscribe({
      next: (response) => {
        this.projects = response;
        this.filterProjects();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  openProject(project: ProjectResponse) {
    this.router.navigate([`/employer/bids/${project.id}`]);
  }

  private filterProjects() {
    if(this.projectStatus === "active") {
      this.projects = this.projects.filter(project => project.status.toLowerCase() === "active");
    } else if(this.projectStatus === "completed") {
      this.projects = this.projects.filter(project => project.status.toLowerCase() === "completed");
    } else{
      this.projects = this.projects.filter(project => project.status.toLowerCase() === "open");
    }
  }
}