import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from "./features/authentication/authentication.component";
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { RoleGuard } from './core/guards/role.guard';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
    loadChildren: () => import('./features/authentication/authentication.module').then(m => m.AuthenticationModule),
  },
  {
    path: 'freelancer',
    loadChildren: () => import('./features/freelancer/freelancer.module').then(m => m.FreelancerModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_FREELANCER'] }
  },
  {
    path: 'employer',
    loadChildren: () => import('./features/employer/employer.module').then(m => m.EmployerModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_EMPLOYER'] }
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['ROLE_ADMIN'] }
  }, {
    path: 'unauthorized',
    component: UnauthorizedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
