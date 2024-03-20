import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService } from "../../../../core/services/employer/project.service";
import { ProjectResponse } from "../../../../shared/models/employer/project-create";

@Component({
  selector: 'app-view-projects',
  templateUrl: './view-projects.component.html',
  styleUrls: ['./view-projects.component.scss']
})
export class ViewProjectsComponent {
first: number = 0;
rows: number = 12;
totalrecords: number=60;




  public projects: ProjectResponse[] = [];

  public projectStatus: string = "";
  searchText: any;
  constructor(private projectService: ProjectService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.projectStatus = params['status'];
      this.loadProjects(this.first, this.rows);
    });
  }

  ngOnInit(): void {
    
  }

  onPageChange($event: any) {
    if(this.searchText){
      this.loadSearchProjects(this.searchText, $event.first, $event.rows);
    }
    else{
      this.loadProjects($event.page, $event.rows);
    }
  }

  loadProjects(page: number, rows: number) {
    this.projectService.getPaginatedProjectsByEmployerId(page, rows).subscribe({
      next: (response) => {
        this.projects = response.content;
        this.totalrecords = response.totalElements;
        this.filterProjects();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  search() {
      this.loadSearchProjects(this.searchText, this.first, this.rows);
  }
  loadSearchProjects(searchText: any, first: number, rows: number) {
    this.projectService.searchProjectsByEmployerId(this.searchText,this.first,this.rows).subscribe({
      next: (response) => {
        this.projects = response.content;
        this.totalrecords = response.totalElements;
        this.filterProjects();
      },
      error: (error) => {
        console.error(error);
      }
    });
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
