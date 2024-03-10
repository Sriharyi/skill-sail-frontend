import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from '@angular/material/table';
import { BidCreateComponent } from './components/bid-create/bid-create.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { FreelancerRoutingModule } from './freelancer-routing.module';
import { AssessmentComponent } from './pages/assessment/assessment.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FindProjectComponent } from './pages/find-project/find-project.component';
import { FreelancerLandingComponent } from './pages/freelancer-landing/freelancer-landing.component';
import { MyBidsComponent } from './pages/my-bids/my-bids.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProjectInfoComponent } from './pages/project-info/project-info.component';
import { QuizAppComponent } from './pages/quiz-app/quiz-app.component';
import { QuizInfoComponent } from './pages/quiz-info/quiz-info.component';


@NgModule({
  declarations: [
    FreelancerLandingComponent,
    DashboardComponent,
    QuizInfoComponent,
    QuizAppComponent,
    AssessmentComponent,
    FindProjectComponent,
    ProjectInfoComponent,
    BidCreateComponent,
    OrdersComponent,
    MyBidsComponent,
    OrderCardComponent
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
    ReactiveFormsModule,
    MatSortModule
  ]
})
export class FreelancerModule { }
