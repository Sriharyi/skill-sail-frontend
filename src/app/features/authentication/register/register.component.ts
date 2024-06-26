import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { SignUpRequest } from "../../../shared/models/authentication/sign-up-request";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private destroy$ = new Subject<void>();


  registerForm: FormGroup;

  public readonly POSITIONS = [
    { value: 'ROLE_FREELANCER', viewValue: 'Skill Sailor ', alias: '(Freelancer)' },
    { value: 'ROLE_EMPLOYER', viewValue: 'Skill Seeker ', alias: '(Employer)' },
  ]

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.registerForm = this.createRegisterForm();
  }

  ngOnInit() {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        if (params['role']) {
          this.registerForm.controls['role'].setValue(params['role']);
        }
      });
  }

  createRegisterForm() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      password: ['', [Validators.required,this.passwordValidator, Validators.minLength(6), Validators.maxLength(15)]],
      role: ['', [Validators.required]]
    });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = <string>control.value;
    if (!value) { 
      return null;
    }
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialCharacters;
    return valid ? null : {
      invalidPassword: true
    };
  }


  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const registerData: SignUpRequest = new SignUpRequest(
      <string>this.registerForm.value.email,
      <string>this.registerForm.value.password,
      [<string>this.registerForm.value.role]
    );

    this.authService.register(registerData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
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
            this.snackBar.open('Email Already Exists', 'Close', {
              duration: 3000
            });
          }
        }
      );
  }


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
