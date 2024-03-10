import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ProfileAboutComponent } from './components/profile-about/profile-about.component';
import { ProfileBadgesComponent } from './components/profile-badges/profile-badges.component';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';


@NgModule({
    declarations: [
        ProfileCardComponent,
        ProfileBadgesComponent,
        ProfileAboutComponent,
        ProfileComponent,
        ProfileUpdateComponent
    ],
    exports: [
        ProfileCardComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatSnackBarModule
    ]
})
export class ProfileModule { }
