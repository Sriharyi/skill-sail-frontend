import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UpdateComponent } from './components/update/update.component';
import { ProfileRatingComponent } from './components/profile-rating/profile-rating.component';
import { ProfileAboutComponent } from './components/profile-about/profile-about.component';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ProjectComponent } from './pages/project/project.component';
import { MatChipsModule } from '@angular/material/chips';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [EmployerComponent, DashboardComponent, ProfileComponent, ProfileCardComponent, UpdateComponent, ProfileRatingComponent, ProfileAboutComponent, ProjectComponent],
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
        MatNativeDateModule
    ]
})
export class EmployerModule { }