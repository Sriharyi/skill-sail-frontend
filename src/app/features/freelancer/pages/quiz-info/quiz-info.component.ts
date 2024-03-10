import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiz-info',
  templateUrl: './quiz-info.component.html',
  styleUrls: ['./quiz-info.component.scss']
})
export class QuizInfoComponent {


  constructor(private route: ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    
  }

  start() {
    const testId = this.route.snapshot.params['testId'];
    const skillId = this.route.snapshot.queryParams['skillId'];
    this.router.navigate([`/freelancer/assessment/start/${testId}`], { queryParams: { skillId: skillId } });
  }
}
