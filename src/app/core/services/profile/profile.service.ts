import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly API = `${environment.DOMAIN}/freelancers`;

  constructor(private http: HttpClient) { }

  updateProfilePicture(id:string , file: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.put<string>(`${this.API}/profile-picture/${id}`, formData, { responseType: 'text' as 'json' });
  }

  getProfilePicture(id:string): Observable<string> {
    return this.http.get<string>(`${this.API}/profile-picture/${id}`);
  }





}
