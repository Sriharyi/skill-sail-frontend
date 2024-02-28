import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DEGREES, LOCATIONS, YEARS} from "../../../../core/constants/constants";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent {

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  profileForm:FormGroup = this.formBuilder.group({
    name: '',
    bio: '',
    skills: [[]],
    location: '',
    collegeName: '',
    degree: '',
    major: '',
    graduationYear: ''
  });
  skillsOptions: string[] = ['Angular', 'NodeJS', 'MongoDB'];
  protected readonly LOCATIONS = LOCATIONS;
  protected readonly YEARS = YEARS;
  protected readonly DEGREES = DEGREES;
  onSubmit() {
    console.log(this.profileForm.value);
  }

  get selectedSkills(): string[] {
    return this.profileForm.get('skills')?.value;
  }

  onSkillChange($event: MatSelectChange) {
    console.log($event);
  }
}
