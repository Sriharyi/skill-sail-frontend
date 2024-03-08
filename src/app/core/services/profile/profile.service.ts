import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserService } from '../user.service';
import { FreelancerProfile } from 'src/app/shared/models/profile/freelancer-profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly API = `${environment.DOMAIN}/freelancers`;

  constructor(private http: HttpClient,private userService:UserService) { }

  updateProfilePicture(id:string , file: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.put<string>(`${this.API}/profile-picture/${id}`, formData, { responseType: 'text' as 'json' });
  }

  getProfilePicture(id:string): Observable<string> {
    return this.http.get<string>(`${this.API}/profile-picture/${id}`);
  }

  getProfile(): Observable<FreelancerProfile> {
  const id = this.userService.getUserId();
  return this.http.get<any>(`${this.API}/${id}`);
  }

  updateProfile(profile: FreelancerProfile): Observable<FreelancerProfile> {
    console.log(profile);
    const id = this.userService.getUserId();
    return this.http.put<FreelancerProfile>(`${this.API}/${id}`, profile);
  }

}
