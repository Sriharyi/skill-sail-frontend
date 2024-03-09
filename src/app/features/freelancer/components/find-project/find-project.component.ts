import {Component} from '@angular/core';
import {Project} from "../../../../shared/models/freelancer/project";
import {ProjectService} from "../../../../core/services/employer/project.service";
import {Page, ProjectResponse} from "../../../../shared/models/employer/project-create";

@Component({
  selector: 'app-find-project',
  templateUrl: './find-project.component.html',
  styleUrls: ['./find-project.component.scss']
})
export class FindProjectComponent {
  searchTerm: any;
  projects: Project[] = [];

  constructor(private projectService: ProjectService) {

  }

  ngOnInit() {
    this.projectService.getPaginatedProjects(0, 10).subscribe({
      next: (response:Page<ProjectResponse>) => {
        this.projects = response.content.map((project) => Project.fromJson(project));
      }
    });
  }

  searchProjects() {
    console.log(this.searchTerm)
  }

  search() {
    console.log(this.searchTerm)
  }
}
