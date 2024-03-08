import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ProjectCreateRequest, ProjectCreateResponse} from "../../../shared/models/employer/project-create";
import {environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private  readonly apiUrl:string = `${environment.DOMAIN}/projects`;
  constructor(private http:HttpClient) {
  }

  //create project
  createProject(project:ProjectCreateRequest){
    return this.http.post<ProjectCreateResponse>(`${this.apiUrl}`,project);
  }


}
