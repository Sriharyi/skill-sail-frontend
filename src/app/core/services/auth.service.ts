import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest } from 'src/app/shared/models/authentication/login-request';
import { environment } from 'src/environments/environment.development';
import { SignInResponse } from '../../shared/models/authentication/sign-in-response';
import { SignUpRequest } from '../../shared/models/authentication/sign-up-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl: string = `${environment.DOMAIN}/auth`;
  private readonly ACCESS_TOKEN: string = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN: string = 'REFRESH_TOKEN';

  public isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  public isLoggedIn$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private JwtHelper: JwtHelperService) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  //login api call
  login(loginRequest: LoginRequest): Observable<SignInResponse> {
    return this.http
      .post<SignInResponse>(
        `${this.authUrl}/authenticate`,
        loginRequest,
        this.httpOptions
      )
      .pipe(
        tap((data) => {
          const token = this.JwtHelper.decodeToken(data.accessToken);
          console.log(token);
          this.doLoginUser(data);
        })
      );
  }

  //register api call
  public register(registerRequest: SignUpRequest): Observable<SignInResponse> {
    return this.http
      .post<SignInResponse>(
        `${this.authUrl}/register`,
        registerRequest,
        this.httpOptions
      )
      .pipe(
        tap((data) => {
          this.doLoginUser(data);
        })
      );
  }

  refreshToken() {
    return this.http
      .post<SignInResponse>(
        `${this.authUrl}/refresh-token`,
        null,
        this.httpOptions
      )
      .pipe(
        tap((data) => {
          this.storeToken(data.accessToken, data.refreshToken);
        })
      );
  }

  //logout
  public logout() {
    localStorage.removeItem(this.ACCESS_TOKEN);
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
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  //get access_token
  public getAccessToken() {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  //authenticate user
  public isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }
}
