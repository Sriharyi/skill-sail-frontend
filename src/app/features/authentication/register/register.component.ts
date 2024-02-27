import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import { AuthService } from 'src/app/core/services/auth.service';
import {SignUpRequest} from "../../../shared/models/authentication/sign-up-request";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
  }

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
  });

  ngOnInit() {

  }


  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.snackBar.open('Form submitted successfully', 'Close', {
      duration: 3000
    });


    const registerData: SignUpRequest = new SignUpRequest(
      <string>this.registerForm.value.email,
      <string>this.registerForm.value.password,
      ['ROLE_ADMIN']
    );

    console.log(registerData);

    this.authService.register(registerData).subscribe((data) => {
      console.log(data);
    });

  }
}
