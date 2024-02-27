import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {LoginRequest} from "../../../shared/models/authentication/login-request";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
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

    this.snackBar.open('Form submitted successfully', 'Close', {
      duration: 3000
    });

    const loginData :LoginRequest = new LoginRequest(
      <string>this.loginForm.value.email,
      <string>this.loginForm.value.password
    );
    console.log(loginData);

    this.authService.login(loginData).subscribe((data) => {
      console.log(data);
    });



  }
}
