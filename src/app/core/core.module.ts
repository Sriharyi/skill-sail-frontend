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
import { FooterComponent } from './footer/footer.component';
import { JwtModule } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    HeaderComponent,
    RoleBasedAccessDirective,
    PermissionBasedAccessDirective,
    FooterComponent,
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    HttpClientModule,
    MatMenuModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['localhost:3000'],
        disallowedRoutes: ['http://localhost:3000/auth/']
      }
    })
    
  ]
})
export class CoreModule {
}
