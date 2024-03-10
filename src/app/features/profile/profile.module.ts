import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileCardComponent } from './components/profile-card/profile-card.component';
import { ProfileBadgesComponent } from './components/profile-badges/profile-badges.component';
import { ProfileAboutComponent } from './components/profile-about/profile-about.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {MatCardModule} from "@angular/material/card";
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import { MatSnackBarModule } from '@angular/material/snack-bar';


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
