import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Question, SkillForm} from "../../../../shared/models/admin/skill-form";
import {SkillService} from "../../../../core/services/admin/skill.service";

@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.scss']
})
export class CreateSkillComponent {

  public skillForm!:FormGroup;

  constructor(private fb:FormBuilder,private skillservice:SkillService) { }

  ngOnInit(): void {
      this.skillForm = this.createSkill();
  }

  createSkill(){
    return this.fb.group<SkillForm>({
      skillName: new FormControl("", Validators.required),
      skillDescription: new FormControl("", Validators.required),
      questions:new FormArray([this.createQuestion()])
    });
  }

  createQuestion(){
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

  get questions(){
    return this.skillForm.get('questions') as FormArray;
  }

  addQuestion(){
    this.questions.push(this.createQuestion());
  }

  removeQuestion(index:number){
    this.questions.removeAt(index);
  }

  submit(){
    console.log(this.skillForm.value);
    this.skillservice.createSkill(this.skillForm.value).subscribe(data=>{
      console.log(data);
    });
  }

  private createOption() {
    return this.fb.control("", Validators.required);
  }

  getOptions(questionIndex:number){
    return (this.questions.at(questionIndex).get('options') as FormArray);
  }

  ngOnDestroy(): void {
    this.skillForm.reset();
  }

}
