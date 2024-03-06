import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-info',
  templateUrl: './quiz-info.component.html',
  styleUrls: ['./quiz-info.component.scss']
})
export class QuizInfoComponent {
  
  constructor(private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      const testId = this.route.snapshot.params['testId'];
      console.log(testId);
      const skillId = this.route.snapshot.queryParams['skillId'];
      console.log(skillId);
    }
}
