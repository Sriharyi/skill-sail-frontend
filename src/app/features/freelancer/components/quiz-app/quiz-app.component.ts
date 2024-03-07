import { Component } from '@angular/core';
import { Question } from 'src/app/shared/models/freelancer/question';
import { SkillService } from "../../../../core/services/admin/skill.service";
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AssessmentService } from 'src/app/core/services/freelancer/assessment.service';
import { AssessmentDto } from 'src/app/shared/models/freelancer/assessment';


@Component({
  selector: 'app-quiz-app',
  templateUrl: './quiz-app.component.html',
  styleUrls: ['./quiz-app.component.scss']
})
export class QuizAppComponent {


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
  totalQuestions: number = 0;

  private assessmentId: string = '';
  private skillId: string = '';

  constructor(private skillService: SkillService, private route: ActivatedRoute, private router: Router, private assessmentService: AssessmentService) {
  }

  ngOnInit() {
    //get the id from router path
    this.skillId = this.route.snapshot.queryParams['skillId'];
    this.assessmentId = this.route.snapshot.params['testId'];
    this.skillService.getQuestions(this.skillId).subscribe({
      next: (data) => {
        if (data.questions) {
          this.questions = data.questions;
          this.totalQuestions = this.questions.length;
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
          this.ShowResult();
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
    const correctOption = this.currentQuestion.correctOption;

    if (this.selectedOption === correctOption) {
      this.correctAnswer++;
    } else {
      if (this.selectedOption !== -1) {

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

    let result: AssessmentDto = {
      id: this.assessmentId,
      skillId: this.skillId,
      freelancerId: '',
      status: '',
      score: 0
    }

    result.score = (this.correctAnswer*10) - (this.wrongAnswer*5);

    const totalscore = this.totalQuestions * 10;
    const passScore = totalscore * 0.8;

    if (result.score >= passScore) {
      result.status = 'COMPLETED';
    } else {
      result.status = 'FAILED';
    }

    this.assessmentService.submitAssessment(this.assessmentId, result).subscribe({
      next: (data) => {
        console.log(data);
        this.showResultDialog(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  showResultDialog(data: AssessmentDto) {
    Swal.fire({
      title: 'Test Completed',
      text: `You have scored ${data.score} out of ${this.totalQuestions * 10} and your status is ${data.status}`,
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      this.router.navigate(['/freelancer/skills']);
    });
  }
}
