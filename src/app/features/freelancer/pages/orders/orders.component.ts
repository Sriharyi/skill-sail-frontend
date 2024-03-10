import { Component } from '@angular/core';
import {ProjectCard} from "../../../../shared/models/freelancer/project";
import {ProjectService} from "../../../../core/services/employer/project.service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {

  projects:ProjectCard[] = [];
  constructor(private projectService:ProjectService){
  }

  ngOnInit() {
        this.loadProjects();
  }

  loadProjects() {
    this.projectService.getAcceptedProjects().subscribe({
      next: (response) => {
        this.projects = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
