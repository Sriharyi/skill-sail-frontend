import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, tap } from "rxjs";
import { User } from "src/app/shared/models/authentication/user-dto";
import { environment } from "src/environments/environment.development";



@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  private readonly apiUrl = `${environment.DOMAIN}/users`;
  
  public readonly USER_KEY = 'USER';
  private userSubject:BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();
  private user: User;

  constructor(private http: HttpClient) {
    if (localStorage.getItem(this.USER_KEY)) {
      console.log('user exists');
      const user = JSON.parse(<string>localStorage.getItem(this.USER_KEY));
      this.userSubject.next(user);
      this.user = user;
    }
    else {
      this.userSubject.next(null);
      this.user = {
        id: '',
        email: '',
        roles: [],
        permissions: []
      }
    }
  }

 

  setUser(user: User): void {
    console.log(user);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);
    this.user = user;
  }


  getUserHttp() {
    return this.http.get<User>(`${this.apiUrl}/me`).pipe(
      tap(user => this.setUser(user))
    );
  }


  clearUser(): void {
    localStorage.removeItem(this.USER_KEY);
    this.userSubject.next(null);
  }

  getUserId(): string {
    return this.user.id;
  }

  getRoles(): string[] {
    return this.user.roles;
  }

  getPermissions(): string[] {
    return this.user.permissions;
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.every(role => this.user.roles.includes(role));
  }


 



}