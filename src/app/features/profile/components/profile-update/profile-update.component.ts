import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DEGREES, LOCATIONS, SKILLS, YEARS} from "../../../../core/constants/constants";
import {MatSelectChange} from "@angular/material/select";
import {Edu, FreelancerUpdateForm} from "../../../../shared/models/profile/freelancer-update-form";
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent {

  protected readonly SKILLS: string[] = SKILLS;
  protected readonly LOCATIONS: string[] = LOCATIONS;
  protected readonly YEARS: number[] = YEARS;
  protected readonly DEGREES: string[] = DEGREES;

  public profileForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private profiileService:ProfileService,private route:ActivatedRoute,private router:Router,private snackBar: MatSnackBar) {
    const id  = this.route.snapshot.paramMap.get('id');
    this.profiileService.getProfile().subscribe((profile) => {
      this.profileForm.patchValue(profile);
    });
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group<FreelancerUpdateForm>(
      {
        displayName: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
        skills: new FormControl([""], Validators.required),
        educations: this.formBuilder.array([this.createEducation()])
      }
    );
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.profiileService.updateProfile(this.profileForm.value).subscribe(
        {
          next: (response) => {
            this.snackBar.open("Profile Updated", "Close", {
              duration: 2000,
            });
            this.router.navigate(["/freelancer/profile"]);
          }
        });
    }
  }

  private createEducation() {
    return this.formBuilder.group<Edu>({
      location: new FormControl("", Validators.required),
      collegeName: new FormControl("", Validators.required),
      degree: new FormControl("", Validators.required),
      major: new FormControl("", Validators.required),
      graduationYear: new FormControl(null, Validators.required)
    });
  }

  get educations() {
    return this.profileForm.get('educations') as FormArray;
  }

  addEducation() {
    this.educations.push(this.createEducation());
  }

  deleteEducation(index: number) {
    this.educations.removeAt(index);
  }
}
