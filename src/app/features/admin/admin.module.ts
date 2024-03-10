import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {CreateSkillComponent} from './pages/create-skill/create-skill.component';
import {ManageSkillComponent} from './pages/manage-skill/manage-skill.component';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { MatSelectModule } from '@angular/material/select';
import { DashboardInfoComponent } from './pages/dashboard-info/dashboard-info.component';
import { AdminComponent } from './admin.component';
import {MatCardModule} from "@angular/material/card";


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
