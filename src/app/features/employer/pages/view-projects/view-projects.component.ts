import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService } from "../../../../core/services/employer/project.service";
import { ProjectResponse } from "../../../../shared/models/employer/project-create";
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.scss']
})
export class ViewProjectsComponent {
handlePageEvent($event: PageEvent) {
throw new Error('Method not implemented.');
}
search() {
throw new Error('Method not implemented.');
}

  public projects: ProjectResponse[] = [];

  public projectStatus: string = "";
  searchText: any;
  constructor(private projectService: ProjectService, private router: Router, private route: ActivatedRoute) {
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
    if (this.projectStatus === "active") {
      this.projects = this.projects.filter(project => project.status.toLowerCase() === "active");
    } else if (this.projectStatus === "completed") {
      this.projects = this.projects.filter(project => project.status.toLowerCase() === "completed");
    } else {
      this.projects = this.projects.filter(project => project.status.toLowerCase() === "open");
    }
  }
}
