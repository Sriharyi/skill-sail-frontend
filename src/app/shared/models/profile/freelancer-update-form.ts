import {FormArray, FormControl} from "@angular/forms";

export interface FreelancerUpdateForm {
  displayName: FormControl<string | null>;
  description: FormControl<string | null>;
  skills: FormControl<string[] | null>;
  educations: FormArray;
}

export interface Edu {
  location: FormControl<string | null>;
  collegeName: FormControl<string | null>;
  degree: FormControl<string | null>;
  major: FormControl<string | null>;
  graduationYear: FormControl<number | null>;
}


