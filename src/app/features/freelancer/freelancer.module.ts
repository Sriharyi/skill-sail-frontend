import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerRoutingModule } from './freelancer-routing.module';
import { FreelancerLandingComponent } from './pages/freelancer-landing/freelancer-landing.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuizInfoComponent } from './components/quiz-info/quiz-info.component';
import { QuizAppComponent } from './components/quiz-app/quiz-app.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    FreelancerLandingComponent,
    DashboardComponent,
    QuizInfoComponent,
    QuizAppComponent
  ],
    imports: [
        CommonModule,
        FreelancerRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatListModule
    ]
})
export class FreelancerModule { }
