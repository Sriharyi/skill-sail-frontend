import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from '@angular/material/paginator';
import { AssessmentComponent } from './components/assessment/assessment.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuizAppComponent } from './components/quiz-app/quiz-app.component';
import { QuizInfoComponent } from './components/quiz-info/quiz-info.component';
import { FreelancerRoutingModule } from './freelancer-routing.module';
import { FreelancerLandingComponent } from './pages/freelancer-landing/freelancer-landing.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    FreelancerLandingComponent,
    DashboardComponent,
    QuizInfoComponent,
    QuizAppComponent,
    AssessmentComponent
  ],
    imports: [
        CommonModule,
        FreelancerRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        FormsModule,
        MatPaginatorModule,
        MatTableModule
    ]
})
export class FreelancerModule { }
