import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz-app',
  templateUrl: './quiz-app.component.html',
  styleUrls: ['./quiz-app.component.scss']
})
export class QuizAppComponent {
    constructor() { }

    timerLeftMin: number = 4;
    timerLeftSec: number = 59;
    ngOnInit() {
    }

}
