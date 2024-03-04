import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from 'src/app/core/services/auth.service';
import { SignUpRequest } from "../../../shared/models/authentication/sign-up-request";
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
    role: ['', [Validators.required]]
  });

  public readonly POSITIONS = [
    { value: 'ROLE_FREELANCER', viewValue: 'Skill Sailor ', alias: '(Freelancer)' },
    { value: 'ROLE_EMPLOYER', viewValue: 'Skill Seeker ', alias: '(Employer)' },
  ]

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
  }



  ngOnInit() {

  }


  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.snackBar.open('Successfully Registered', 'Close', {
      duration: 2000,
    });

    const registerData: SignUpRequest = new SignUpRequest(
      <string>this.registerForm.value.email,
      <string>this.registerForm.value.password,
      [<string>this.registerForm.value.role]
    );

    console.log(registerData);

    this.authService.register(registerData).subscribe(
      {
        next: (data) => {
          if (data.accessToken) {
            this.router.navigate(['/login']);
          }
        }
      }
    );

  }
}
