import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment.development";
import { Page, ProjectCreateRequest, ProjectResponse } from "../../../shared/models/employer/project-create";
import { ProjectCard } from "../../../shared/models/freelancer/project";
import { UserService } from "../user.service";
import { Observable, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private readonly apiUrl: string = `${environment.DOMAIN}/projects`;
  constructor(private http: HttpClient, private userService: UserService) {
  }

  //create project
  createProject(project: ProjectCreateRequest, file: File) {
    project.employerProfileId = this.userService.getUserId();
  
    // Make the HTTP request to create the project
    return this.http.post<ProjectResponse>(`${this.apiUrl}`, project).pipe(
      switchMap((projectResponse: ProjectResponse) => {
        const projectId = projectResponse.id;
        
        // Create a new FormData and append the file to it
        const formData = new FormData();
        formData.append('file', file);
  
        // Make the HTTP request to upload the file
        return this.http.put<ProjectResponse>(`${this.apiUrl}/${projectId}/file`, formData);
      })
    );
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
