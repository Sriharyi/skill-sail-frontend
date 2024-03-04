import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/shared/models/authentication/user-dto';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {


  public isLogged: boolean = false;
  public user!: User | null;
  
  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLogged => {
      this.isLogged = isLogged;
    });

    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
    this.userService.clearUser();
  }
}

