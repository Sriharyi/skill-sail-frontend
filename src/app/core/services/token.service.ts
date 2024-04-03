import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(private jwtHelper:JwtHelperService) { }

  getAccessToken(): string {
    return localStorage.getItem(this.ACCESS_TOKEN) as string;
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.REFRESH_TOKEN) as string;
  }

  setAccessToken(accessToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
  }

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  removeTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  isAccessTokenExpired(): boolean {
    return this.jwtHelper.isTokenExpired(this.getAccessToken());
  }

  isRefreshTokenExpired(): boolean {
    return this.jwtHelper.isTokenExpired(this.getRefreshToken());
  }

    


  
}
