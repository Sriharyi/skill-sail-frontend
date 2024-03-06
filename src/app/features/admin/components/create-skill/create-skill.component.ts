import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Question, SkillForm} from "../../../../shared/models/admin/skill-form";
import {SkillService} from "../../../../core/services/admin/skill.service";
import { CATEGORIES } from 'src/app/core/constants/constants';

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.scss']
})
export class CreateSkillComponent {

  public skillForm!: FormGroup;
  public jsonFile!: File;
  public readonly CATEGORIES = CATEGORIES;

  constructor(private fb: FormBuilder, private skillservice: SkillService) {
  }

  ngOnInit(): void {
    this.skillForm = this.createSkill();
  }

  createSkill() {
    return this.fb.group<SkillForm>({
      skillName: new FormControl("", Validators.required),
      skillDescription: new FormControl("", Validators.required),
      skillCategory: new FormControl("", Validators.required),
      questions: new FormArray([this.createQuestion()], Validators.required)
    });
  }

  createQuestion() {
    return this.fb.group<Question>({
      question: new FormControl("", Validators.required),
      options: new FormArray([
        this.createOption(),
        this.createOption(),
        this.createOption(),
        this.createOption()
      ], Validators.required),
      correctOption: new FormControl(null, Validators.required),
      type: new FormControl("", Validators.required)
    });
  }

  get questions() {
    return this.skillForm.get('questions') as FormArray;
  }

  addQuestion() {
    this.questions.push(this.createQuestion());
  }

  removeQuestion(index: number) {
    this.questions.removeAt(index);
  }

  submit() {
    console.log(this.skillForm.value);
    this.skillservice.createSkill(this.skillForm.value).subscribe(data => {
      console.log(data);
    });
  }

  private createOption() {
    return this.fb.control("", Validators.required);
  }

  getOptions(questionIndex: number) {
    return (this.questions.at(questionIndex).get('options') as FormArray);
  }

  onFileInput($event: Event) {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file.type === 'application/json') {
      this.jsonFile = file;
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = (e) => {
        const fileContent = fileReader.result;
        if (fileContent !== null) {
          const pars = JSON.parse(fileContent.toString());
          // set the value of the form
          const questions:Question[] = pars.questions;
          this.skillForm.value.questions.pop();
          questions.forEach((question:Question) => {
            this.skillForm.value.questions.push(question);
          });
        }
      }
    }
  }
  ngOnDestroy(): void {
    this.skillForm.reset();
  }
}
