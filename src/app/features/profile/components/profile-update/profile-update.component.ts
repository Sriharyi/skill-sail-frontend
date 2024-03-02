import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DEGREES, LOCATIONS, YEARS} from "../../../../core/constants/constants";
import {MatSelectChange} from "@angular/material/select";
import {Edu, FreelancerUpdateForm} from "../../../../shared/models/profile/freelancer-update-form";

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent {

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  public profileForm!:FormGroup;


  ngOnInit(){
      this.profileForm = this.formBuilder.group<FreelancerUpdateForm>(
      {
        displayName: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required),
        skills: new FormControl([""], Validators.required),
        educations: this.formBuilder.array([this.createEducation()])
      }
      );
  }
  skillsOptions: string[] = ['Angular', 'NodeJS', 'MongoDB'];
  protected readonly LOCATIONS = LOCATIONS;
  protected readonly YEARS = YEARS;
  protected readonly DEGREES = DEGREES;
  onSubmit() {

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
