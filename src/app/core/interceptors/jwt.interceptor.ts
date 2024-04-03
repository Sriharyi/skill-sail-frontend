import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AuthService } from "../services/auth.service";
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,private tokenService: TokenService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.tokenService.getAccessToken();
    const isTokenExpired = this.tokenService.isAccessTokenExpired();
    const refreshToken = this.tokenService.getRefreshToken();
    const isRefreshTokenExpired = this.tokenService.isRefreshTokenExpired();
    if (token && !isTokenExpired) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else if (refreshToken && isTokenExpired && !isRefreshTokenExpired) {

         if(request.url.endsWith('/refresh-token'))
         {
           request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${refreshToken}`
              }
            });
         } 
         else {
            return this.authService.refreshToken().pipe(
              switchMap(
                () => {
                  const newToken = this.tokenService.getAccessToken();
                  request = request.clone({
                    setHeaders: {
                      Authorization: `Bearer ${newToken}`
                    }
                  });
                  return next.handle(request);
                }
              )
            );
         }
    } else if (refreshToken && isRefreshTokenExpired) {
      this.authService.logout();
      this.router.navigate(['auth/login']);
      return EMPTY;
    }
    return next.handle(request);
  }
}
