import { FormArray, FormControl } from "@angular/forms";

export interface SkillForm {
  skillName: FormControl<string | null>;
  skillDescription: FormControl<string | null>;
  skillCategory: FormControl<string | null>;
  questions: FormArray;
}

export interface Question {
  question: FormControl<string | null>;
  options:FormArray;
  correctOption: FormControl<number | null>;
  type: FormControl<string | null>;
}

