import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AssessmentService } from 'src/app/core/services/freelancer/assessment.service';
import { AssessmentDto } from 'src/app/shared/models/freelancer/assessment';
import { Question } from 'src/app/shared/models/freelancer/question';
import Swal from 'sweetalert2';
import { SkillService } from '../../../../core/services/admin/skill.service';
import { ProfileService } from '../../../../core/services/profile/profile.service';

@Component({
  selector: 'app-quiz-app',
  templateUrl: './quiz-app.component.html',
  styleUrls: ['./quiz-app.component.scss'],
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
  isSkipped: boolean = false;
  totalQuestions: number = 0;
  skipcount: number = 0;
  interval: any;

  private assessmentId: string = '';
  private skillId: string = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private skillService: SkillService,
    private route: ActivatedRoute,
    private router: Router,
    private assessmentService: AssessmentService
  ) {}

  ngOnInit() {
    //get the id from router path
    this.skillId = this.route.snapshot.queryParams['skillId'];
    this.assessmentId = this.route.snapshot.params['testId'];
    this.skillService
      .getQuestions(this.skillId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          if (data.questions) {
            this.questions = data.questions;
            this.totalQuestions = this.questions.length;
            this.startQuiz();
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
    this.destroy$.next();
    this.destroy$.complete();
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

  skipQuestion() {
    if (this.currentQuestionIndex === this.totalQuestions - 1) {
      Swal.fire({
        title: 'you are about to finish the quiz',
        text: 'If you skip this question, the quiz will be submitted automatically. Do you want to continue?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then((result) => {
        if (result.isConfirmed) {
          this.submitTest();
        }
      });
    } else {
      if (this.skipcount < 3) {
        const canSkip = 2 - this.skipcount;
        Swal.fire(
          'You have skipped the question',
          `You can skip ${canSkip} more questions`,
          'info'
        ).then(() => this.nextQuestion());
      } else if (this.skipcount === 3) {
        //he skipped is 3 he can't skip more than 3 questions
        Swal.fire(
          'You have skipped 3 questions',
          'You can not skip more than 3 questions',
          'error'
        ).then(() => this.nextQuestion());
      }
    }
  }

  private isCorrectAnswer() {
    const correctOption = this.currentQuestion.correctOption;
    if (this.selectedOption === correctOption) {
      this.correctAnswer++;
    } else {
      if (this.selectedOption !== -1) {
        this.wrongAnswer++;
      } else {
        this.skipcount++;
      }
    }
  }

  private UpdateQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    }
  }

  clearOption() {
    this.selectedOption = -1;
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
      score: 0,
    };

    result.score = this.correctAnswer * 10 - this.wrongAnswer * 5;

    const totalscore = this.totalQuestions * 10;
    const passScore = totalscore * 0.7;

    if (result.score < 0) {
      result.score = 0;
    }

    if (result.score >= passScore) {
      result.status = 'COMPLETED';
    } else {
      result.status = 'FAILED';
    }

    this.assessmentService
      .submitAssessment(this.assessmentId, result)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.showResultDialog(data);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  showResultDialog(data: AssessmentDto) {
    if (data.status === 'COMPLETED') {
      Swal.fire({
        title: 'Test Completed',
        html: `You have scored <strong>${data.score}</strong> out of <strong>${
          this.totalQuestions * 10
        }</strong> and your status is  <span style="color: green;"> ${
          data.status
        } </span>`,
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        this.router.navigate(['/freelancer/skills']);
      });
    } else {
      Swal.fire({
        title: 'Test Failed',
        html: `You have scored <strong>${data.score}</strong> out of <strong>${
          this.totalQuestions * 10
        }</strong> and your status is  <span style="color: red;"> ${
          data.status
        } </span>`,
        icon: 'error',
        confirmButtonText: 'OK',
      }).then(() => {
        this.router.navigate(['/freelancer/skills']);
      });
    }
  }
}
