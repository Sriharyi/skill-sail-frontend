import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTableModule } from "@angular/material/table";
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CreateSkillComponent } from './pages/create-skill/create-skill.component';
import { DashboardInfoComponent } from './pages/dashboard-info/dashboard-info.component';
import { ManageSkillComponent } from './pages/manage-skill/manage-skill.component';


@NgModule({
  declarations: [
    CreateSkillComponent,
    ManageSkillComponent,
    DashboardInfoComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class AdminModule {
}
