import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment.development";
import { SkillDto } from "../../../shared/models/admin/skill-dto";
import { SkillForm } from "../../../shared/models/admin/skill-form";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private readonly apiUrl: string = `${environment.DOMAIN}/skills`;

  private httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


  constructor(private http: HttpClient) {
  }

  //create skill
  createSkill(skill: SkillForm) {
    return this.http.post(`${this.apiUrl}`, skill, this.httpOptions);
  }

  //get all skills
  getSkills() {
    return this.http.get(`${this.apiUrl}`);
  }

  //get skill by id
  getSkillById(id: string): Observable<SkillDto> {
    return this.http.get<SkillDto>(`${this.apiUrl}/${id}`);
  }

  //update skill
  updateSkill(id: string, skill: SkillForm) {
    return this.http.put(`${this.apiUrl}/${id}`, skill, this.httpOptions);
  }

  //delete skill
  deleteSkill(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  //get all skills by page
  getSkillsByPage(pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/page?page=${pageIndex}&size=${pageSize}`);
  }

  //enable & diable skill
  toggleSkill(skillId: string) {
    return this.http.put(`${this.apiUrl}/toggle/${skillId}`, null, this.httpOptions);
  }

  //get skills by category
  getSkillsByCategory(category: string): Observable<SkillDto[]> {
    return this.http.get<SkillDto[]>(`${this.apiUrl}/category?category=${category}`);
  }

  getQuestions(skillId: string): Observable<SkillDto> {
    return this.getSkillById(skillId);
  }
}
