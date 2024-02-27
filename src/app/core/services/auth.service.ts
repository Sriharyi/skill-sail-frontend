import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { LoginRequest } from 'src/app/shared/models/authentication/login-request';
import {SignInResponse} from "../../shared/models/authentication/sign-in-response";
import {SignUpRequest} from "../../shared/models/authentication/sign-up-request";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl:string = `${environment.DOMAIN}/auth`;
  private readonly JWT_TOKEN:string = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN:string = 'REFRESH_TOKEN';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  constructor(private http: HttpClient) {

  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  //login api call
  login(loginRequest: LoginRequest):Observable<SignInResponse>{
    return this.http.post<SignInResponse>(`${this.authUrl}/login`, loginRequest, this.httpOptions).pipe(
      tap(data => {
        this.doLoginUser(data);
      }
    ));
  }

  //register api call
  public register(registerRequest: SignUpRequest):Observable<SignInResponse>{
    return this.http.post<SignInResponse>(`${this.authUrl}/register`, registerRequest, this.httpOptions).pipe(
      tap(data => {
        this.doLoginUser(data);
      }
    ));
  }

  //logout
  public logout() {
    localStorage.removeItem(this.JWT_TOKEN);
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
    return !!localStorage.getItem(this.JWT_TOKEN);
  }

}
