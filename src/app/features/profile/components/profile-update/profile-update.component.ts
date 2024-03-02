import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DEGREES, LOCATIONS, SKILLS, YEARS} from "../../../../core/constants/constants";
import {MatSelectChange} from "@angular/material/select";
import {Edu, FreelancerUpdateForm} from "../../../../shared/models/profile/freelancer-update-form";

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

  constructor(
    private formBuilder: FormBuilder,
  ) {
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
      console.log(this.profileForm.value);
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
