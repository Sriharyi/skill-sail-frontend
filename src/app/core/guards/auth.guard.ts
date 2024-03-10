import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.authService.isAuthenticatedSubject.subscribe((isAuthenticated) => {
      if (!isAuthenticated) {
        this.router.navigate(['auth/login']);
      }
    });

    if (!this.authService.isAuthenticatedSubject.getValue()) {
      this.router.navigate(['auth/login']);
      return false;
    }

    return true;
  }

}
