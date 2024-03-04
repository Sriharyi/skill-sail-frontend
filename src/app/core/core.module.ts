import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import { RoleBasedAccessDirective } from '../shared/directives/app-role-based-access.directive';
import { PermissionBasedAccessDirective } from '../shared/directives/app-permission-based-access.directive';


@NgModule({
  declarations: [
    HeaderComponent,
    RoleBasedAccessDirective,
    PermissionBasedAccessDirective
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
  ]
})
export class CoreModule {
}
