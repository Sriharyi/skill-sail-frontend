import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SkillForm} from "../../../shared/models/admin/skill-form";
import {environment} from "../../../../environments/environment.development";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private readonly apiUrl = `${environment.DOMAIN}/skills`;
  constructor(private http: HttpClient) { }

  //create skill
  createSkill(skill:SkillForm){
    console.log(skill);
    return this.http.post(`${this.apiUrl}`, skill, this.httpOptions);
  }

  //get all skills
  getSkills(){
    return this.http.get(`${this.apiUrl}`);
  }

  //get skill by id
  getSkillById(id:string){
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  //update skill
  updateSkill(id:string, skill:SkillForm){
    return this.http.put(`${this.apiUrl}/${id}`, skill, this.httpOptions);
  }

  //delete skill
  deleteSkill(id:string){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  //get all skills by page
  getSkillsByPage(pageIndex:number, pageSize:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/page/?page=${pageIndex}&size=${pageSize}`);
  }

  // //get all skills by category
  // getSkillsByCategory(category:string){
  //   return this.http.get(`${this.apiUrl}/category/${category}`);
  // }

  //enable & diable skill
  enableSkill(skillId: string, isChecked: boolean){
    return this.http.put(`${this.apiUrl}/enable/${skillId}`, isChecked);
  }
}