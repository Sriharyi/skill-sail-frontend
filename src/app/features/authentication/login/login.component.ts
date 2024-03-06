import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoginRequest } from "../../../shared/models/authentication/login-request";
import { AuthService } from "../../../core/services/auth.service";
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
  });

  ngOnInit() {
  }


  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData: LoginRequest = new LoginRequest(
      <string>this.loginForm.value.email,
      <string>this.loginForm.value.password
    );

    this.authService.login(loginData).subscribe(
      {
        next: (data) => {
          if (data.accessToken) {
            this.userService.getUserHttp().subscribe(user => {
              if (user.roles.includes('ROLE_ADMIN')) {
                this.router.navigate(['/admin']);
              }
              else if (user.roles.includes('ROLE_EMPLOYER')) {
                this.router.navigate(['/employer']);
              }
              else if (user.roles.includes('ROLE_FREELANCER')) {
                this.router.navigate(['/freelancer']);
              }
              else {
                this.router.navigate(['/unauthorized']);
              }
            });
            this.snackBar.open('Successfully Logged In', 'Close', {
              duration: 2000,
            });
          }
        },
        error: (error) => {
          this.snackBar.open('Invalid Credentials', 'Close', {
            duration: 3000
          });
        }
      }
    );



  }
}
