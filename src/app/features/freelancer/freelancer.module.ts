import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import { FindProjectComponent } from './components/find-project/find-project.component';
import { ProjectInfoComponent } from './components/project-info/project-info.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import { BidCreateComponent } from './components/bid-create/bid-create.component';


@NgModule({
  declarations: [
    FreelancerLandingComponent,
    DashboardComponent,
    QuizInfoComponent,
    QuizAppComponent,
    AssessmentComponent,
    FindProjectComponent,
    ProjectInfoComponent,
    BidCreateComponent
  ],
  imports: [
    CommonModule,
    FreelancerRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule,
    ReactiveFormsModule
  ]
})
export class FreelancerModule { }
