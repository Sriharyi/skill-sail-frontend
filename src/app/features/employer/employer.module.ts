import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { ProfileAboutComponent } from './components/profile-about/profile-about.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ProfileRatingComponent } from './components/profile-rating/profile-rating.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { UpdateComponent } from './components/update/update.component';
import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProjectComponent } from './pages/project/project.component';
import { ViewBidsComponent } from './pages/view-bids/view-bids.component';
import { ViewProjectsComponent } from './pages/view-projects/view-projects.component';


@NgModule({
  declarations: [EmployerComponent, DashboardComponent, ProfileComponent, ProfileCardComponent, UpdateComponent, ProfileRatingComponent, ProfileAboutComponent, ProjectComponent, ViewProjectsComponent, ProjectCardComponent, ViewBidsComponent],
  imports: [
    CommonModule,
    EmployerRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatStepperModule
  ]
})
export class EmployerModule { }
