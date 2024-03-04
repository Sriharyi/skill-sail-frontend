import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { User } from "src/app/shared/models/authentication/user-dto";
import { environment } from "src/environments/environment.development";



@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject!: BehaviorSubject<User | null>;
  private readonly apiUrl = `${environment.DOMAIN}/api/v1/users`;

  public readonly USER_KEY = 'USER';
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    if (localStorage.getItem(this.USER_KEY)) {
      this.userSubject = new BehaviorSubject<User | null>(JSON.parse(<string>localStorage.getItem(this.USER_KEY)));
    }
    else {
      this.userSubject = new BehaviorSubject<User | null>(null);
    }
  }

  setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.value;
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

  getRoles(): string[] {
    return this.userSubject.value?.roles || [];
  }

  getPermissions(): string[] {
    return this.userSubject.value?.permissions || [];
  }

  hasRole(roles: string[]): boolean {
    return roles.some(role => this.getRoles().includes(role));
  }


  hasPermission(permissions: string[]): boolean {
    return permissions.some(permission => this.getPermissions().includes(permission));
  }

  // isLoggedIn(): boolean {
  //   return this.userSubject.value !== null;
  // }

  // isLoggedOut(): boolean {
  //   return !this.isLoggedIn();
  // }

  isFreelancer(): boolean {
    return this.hasRole(['ROLE_FREELANCER']);
  }

  isEmployer(): boolean {
    return this.hasRole(['ROLE_EMPLOYER']);
  }

  isAdmin(): boolean {
    return this.hasRole(['ROLE_ADMIN']);
  }






}