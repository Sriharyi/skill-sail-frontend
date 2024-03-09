import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../user.service';
import { EmployerProfile } from 'src/app/shared/models/employer/emp-profile';
import { EmployerUpdateForm, EmployerUpdateRequest } from 'src/app/shared/models/employer/employer-update';

@Injectable({
  providedIn: 'root'
})
export class EmpProfileService {


  private readonly API = `${environment.DOMAIN}/employers`;

  constructor(private http: HttpClient, private userService: UserService) { }

  updateProfilePicture(file: File): Observable<string> {
    const formData = new FormData();
    const id = this.userService.getUserId();
    formData.append('image', file);
    return this.http.put<string>(`${this.API}/updateimage/${id}`, formData, { responseType: 'text' as 'json' });
  }

  getProfilePicture(id: string): Observable<string> {
    return this.http.get<string>(`${this.API}/updateimage/${id}`);
  }


  getProfile() {
    const id = this.userService.getUserId();
    return this.http.get<EmployerProfile>(`${this.API}/${id}`);
  }

  updateProfile(profile: EmployerUpdateRequest) {
    const id = this.userService.getUserId();
    return this.http.put(`${this.API}/${id}`, profile);
  }

  getProfilebyId(employerId: string) {
    return this.http.get<EmployerProfile>(`${this.API}/${employerId}`);
  }
}
