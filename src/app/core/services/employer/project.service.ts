import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Page, ProjectCreateRequest, ProjectResponse} from "../../../shared/models/employer/project-create";
import {environment} from "../../../../environments/environment.development";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private  readonly apiUrl:string = `${environment.DOMAIN}/projects`;
  constructor(private http:HttpClient) {
  }

  //create project
  createProject(project:ProjectCreateRequest){
    return this.http.post<ProjectResponse>(`${this.apiUrl}`,project);
  }

  //get all projects
  getProjects(){
    return this.http.get<ProjectResponse[]>(`${this.apiUrl}`);
  }

  getProjectById(id:number){
    return this.http.get<ProjectResponse>(`${this.apiUrl}/${id}`);
  }

  //get paginated projects
  getPaginatedProjects(page:number, size:number){
    return this.http.get<Page<ProjectResponse>>(`${this.apiUrl}/page?page=${page}&size=${size}`);
  }


}
