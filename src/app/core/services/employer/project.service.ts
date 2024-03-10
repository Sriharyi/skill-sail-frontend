import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { Page, ProjectCreateRequest, ProjectResponse } from "../../../shared/models/employer/project-create";
import { ProjectCard } from "../../../shared/models/freelancer/project";
import { UserService } from "../user.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly apiUrl: string = `${environment.DOMAIN}/projects`;
  constructor(private http: HttpClient, private userService: UserService) {
  }

  //create project
  createProject(project: ProjectCreateRequest) {
    project.employerProfileId = this.userService.getUserId();
    return this.http.post<ProjectResponse>(`${this.apiUrl}`, project);
  }

  //get all projects
  getProjects() {
    return this.http.get<ProjectResponse[]>(`${this.apiUrl}`);
  }

  getProjectById(id: number) {
    return this.http.get<ProjectResponse>(`${this.apiUrl}/${id}`);
  }

  //get paginated projects
  getPaginatedProjects(page: number, size: number) {
    return this.http.get<Page<ProjectResponse>>(`${this.apiUrl}/page?page=${page}&size=${size}`);
  }

  //get projects by employer id
  getProjectsByEmployerId() {
    const employerId = this.userService.getUserId();
    return this.http.get<ProjectResponse[]>(`${this.apiUrl}/employer/${employerId}`);
  }


  getAcceptedProjects() {
    const freelancerId = this.userService.getUserId();
    return this.http.get<ProjectCard[]>(`${this.apiUrl}/freelancer/${freelancerId}`);
  }
}
