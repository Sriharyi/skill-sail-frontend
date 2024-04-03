import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/authentication/user-dto';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  public isLogged$ = this.authService.isLoggedIn$;
  public user: User | null = null;
  public isUser: boolean = false;
  private user$: Subscription = new Subscription();


  constructor(public authService: AuthService, private userService: UserService,private router:Router) { }

  ngOnInit(): void {
    this.user$ = this.userService.user$.subscribe(user => {
      this.user = user;
      this.isUser = !!user;
    });
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.userService.clearUser();
    this.router.navigate(['auth/login']);
  }
}

