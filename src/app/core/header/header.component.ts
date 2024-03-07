import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/shared/models/authentication/user-dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  public isLogged$ = this.authService.isLoggedIn$;
  public user: User | null = null;
  public isUser: boolean = false;
  public userType: string = '';
  private user$: Subscription = new Subscription();


  constructor(public authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.user$ = this.userService.user$.subscribe(user => {
      this.user = user;
      if (user) {
        this.isUser = true;
        this.userType = user.roles[0];
      } else {
        this.isUser = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.userService.clearUser();
  }
}

