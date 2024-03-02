import {Component} from '@angular/core';
import {Question} from 'src/app/shared/models/Freelancer/Question';
import {SkillService} from "../../../../core/services/admin/skill.service";


@Component({
  selector: 'app-quiz-app',
  templateUrl: './quiz-app.component.html',
  styleUrls: ['./quiz-app.component.scss']
})
export class QuizAppComponent {
  constructor(private skillService: SkillService) {
  }

  timerLeftMin: number = 4;
  timerLeftSec: number = 59;
  questions: Question[] = [];
  selectedOption: number = -1;
  currentQuestionIndex: number = 0;
  currentQuestion!: Question;
  correctAnswer: number = 0;
  wrongAnswer: number = 0;
  isFinished: boolean = false;
  isTimeUp: boolean = false;
  isStarted: boolean = false;
  interval: any;
  totalQuestions: number = 5;


  ngOnInit() {
    //get the id from router path
    this.skillService.getQuestions("65e209511d49537d8184af3d").subscribe({
      next: (data) => {
        if(data.questions) {
          console.log(data.questions);
          this.questions = data.questions;
          this.startQuiz();
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  startQuiz() {
    this.isStarted = true;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.startTimer();
  }

  private startTimer() {
     this.interval = setInterval(() => {
      if (this.timerLeftSec > 0) {
        this.timerLeftSec--;
      } else {
        if (this.timerLeftMin > 0) {
          this.timerLeftMin--;
          this.timerLeftSec = 59;
        } else {
          clearInterval(this.interval);
          this.isTimeUp = true;
          this.isFinished = true;
        }
      }
    }, 1000);
  }

  nextQuestion() {
   this.isCorrectAnswer();
   this.currentQuestionIndex++;
   this.UpdateQuestion();
   this.selectedOption = -1;
  }

  private isCorrectAnswer() {
    console.log(this.selectedOption)
    const correctOption = this.currentQuestion.correctOption;
    console.log(correctOption);
    if (this.selectedOption === correctOption) {
      this.correctAnswer++;
      console.log("hello")
    } else {
      if(this.selectedOption !== -1)
      {
        console.log("wrong")
        this.wrongAnswer++;
      }
    }
  }

  private UpdateQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }


  ngOnDestroy() {
    clearInterval(this.interval);
  }

  submitTest() {
    this.isFinished = true;
    this.isStarted = false;
    this.isCorrectAnswer();
    clearInterval(this.interval);
    this.ShowResult();
  }

  private ShowResult() {
    console.log('Correct Answers: ' + this.correctAnswer);
    console.log('Wrong Answers: ' + this.wrongAnswer);
    const correctAns = this.correctAnswer*10;
    const wrongAns = this.wrongAnswer*5;
    const totalPoint = (correctAns  - wrongAns)<0?0:(correctAns-wrongAns);
    alert(totalPoint);
  }
}
