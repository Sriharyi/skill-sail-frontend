import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CATEGORIES } from 'src/app/core/constants/constants';
import Swal from 'sweetalert2';
import { SkillService } from "../../../../core/services/admin/skill.service";
import { Question, SkillForm } from "../../../../shared/models/admin/skill-form";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-skill',
  templateUrl: './create-skill.component.html',
  styleUrls: ['./create-skill.component.scss']
})
export class CreateSkillComponent {

  public skillForm!: FormGroup;
  public jsonFile!: File;
  public readonly CATEGORIES = CATEGORIES;

  private destroy$: Subject<void> = new Subject<void>();
  private id: string = "";

  constructor(private fb: FormBuilder, private skillservice: SkillService, private route: ActivatedRoute) {
    this.id = <string>this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.getSkill(this.id);
    }
  }
  getSkill(id: string) {
    this.skillservice.getSkillById(id).subscribe((skill) => {
      this.skillForm.patchValue(skill);
    });
  }

  ngOnInit(): void {
    this.skillForm = this.createSkill();
  }

  ngOnDestroy(): void {
    this.skillForm.reset();
  }

  createSkill() {
    return this.fb.group<SkillForm>({
      skillName: new FormControl("", Validators.required),
      skillDescription: new FormControl("", Validators.required),
      skillCategory: new FormControl([""], Validators.required),
      questions: new FormArray([this.createQuestion()])
    });
  }

  createQuestion() {
    return this.fb.group<Question>({
      question: new FormControl(""),
      options: new FormArray([
        this.createOption(),
        this.createOption(),
        this.createOption(),
        this.createOption()
      ]),
      correctOption: new FormControl(null),
      type: new FormControl("")
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


  private createOption() {
    return this.fb.control("");
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
          const jsonpars = JSON.parse(fileContent.toString());
          const questions: Question[] = jsonpars;
          this.skillForm.value.questions.length = 0;
          questions.forEach((question: Question) => {
            this.skillForm.value.questions.push(question);
          });
        }
      }
    }
  }

  submit() {
    if (this.skillForm.invalid) {
      this.skillForm.markAllAsTouched();
      return;
    }

    if (this.skillForm.value.questions.length <= 1) {
      Swal.fire({
        title: 'Invalid Questions',
        text: 'Please add questions',
        confirmButtonColor: 'green',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
      return;
    }

    if (this.id) {
      this.skillservice.updateSkill(this.id, this.skillForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          {
            next: (response) => {
              Swal.fire({
                title: 'Skill Updated',
                confirmButtonColor: 'green',
                icon: 'success',
                confirmButtonText: 'Ok'
              });
            }
          });
    }
    else {
      this.skillservice.createSkill(this.skillForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          if (data) {
            Swal.fire({
              title: 'Skill Created',
              text: 'Skill has been created successfully',
              confirmButtonColor: 'green',
              icon: 'success',
              confirmButtonText: 'Ok'
            });
          }
        });
    }

  }


}
