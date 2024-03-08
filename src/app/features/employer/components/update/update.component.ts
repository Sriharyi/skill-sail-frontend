import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { INDUSTRIES, LOCATIONS } from 'src/app/core/constants/constants';
import { EmpProfileService } from 'src/app/core/services/employer/emp-profile.service';
import { EmployerUpdateForm, EmployerUpdateRequest } from 'src/app/shared/models/employer/employer-update';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent {
  profileForm: FormGroup<EmployerUpdateForm>;

  protected readonly LOCATIONS = LOCATIONS;
  protected readonly INDUSTRIES = INDUSTRIES;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute,private employerService: EmpProfileService) {
    const id = this.route.snapshot.params['id'];
    this.employerService.getProfile().subscribe(response => {
      console.log(response);
      this.profileForm.patchValue(response);
    });

    this.profileForm = this.createProfileForm();
  }

  createProfileForm(): FormGroup<EmployerUpdateForm> {
    return this.fb.group<EmployerUpdateForm>({
      companyName: this.fb.control<string>("", [Validators.required]),
      companyWebsite: this.fb.control<string>("", [Validators.required]),
      companyDescription: this.fb.control<string>("", [Validators.required]),
      companyLocation: this.fb.control<string>("", [Validators.required]),
      companyIndustry: this.fb.control<string>("", [Validators.required]),
    })
  }

  onSubmit() {
    if (this.profileForm.invalid)
      return;

    const profile: EmployerUpdateRequest = this.profileForm.value as EmployerUpdateRequest;

    this.employerService.updateProfile(profile).subscribe({
        next: (response) => {
          this.router.navigate(['/employer/profile']);
        },
        error: (error) => {
         console.error(error);
        }
    });

  }



}
