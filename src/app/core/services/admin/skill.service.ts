import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SkillForm} from "../../../shared/models/admin/skill-form";
import {environment} from "../../../../environments/environment.development";

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

}
