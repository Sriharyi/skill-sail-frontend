import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink } from "@angular/router";
import { PermissionBasedAccessDirective } from '../shared/directives/app-permission-based-access.directive';
import { RoleBasedAccessDirective } from '../shared/directives/app-role-based-access.directive';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    HeaderComponent,
    RoleBasedAccessDirective,
    PermissionBasedAccessDirective,
  ],
  exports: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    HttpClientModule,
    MatMenuModule
  ]
})
export class CoreModule {
}
