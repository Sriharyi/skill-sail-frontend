import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from "rxjs";
import { LoginRequest } from 'src/app/shared/models/authentication/login-request';
import { environment } from 'src/environments/environment.development';
import { SignInResponse } from "../../shared/models/authentication/sign-in-response";
import { SignUpRequest } from "../../shared/models/authentication/sign-up-request";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl: string = `${environment.DOMAIN}/auth`;
  private readonly JWT_TOKEN: string = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN: string = 'REFRESH_TOKEN';

  public isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isLoggedIn$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient,private JwtHelper: JwtHelperService) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  //login api call
  login(loginRequest: LoginRequest): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.authUrl}/authenticate`, loginRequest, this.httpOptions).pipe(
      tap(data => {
        this.doLoginUser(data);
      }
      ));
  }

  //register api call
  public register(registerRequest: SignUpRequest): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.authUrl}/register`, registerRequest, this.httpOptions).pipe(
      tap(data => {
        this.doLoginUser(data); 
      }
      ));
  }

  //logout
  public logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    this.isAuthenticatedSubject.next(false);
  }

  //login
  private doLoginUser(data: SignInResponse) {
    this.storeToken(data.accessToken, data.refreshToken);
    this.isAuthenticatedSubject.next(true);
  }


  //store token
  public storeToken(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.JWT_TOKEN, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  //get access_token
  public getAccessToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  //authenticate user
  public isAuthenticated(): boolean {
    return !this.JwtHelper.isTokenExpired(this.getAccessToken());
  }

}
