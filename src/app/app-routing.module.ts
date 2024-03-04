import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from "./features/authentication/authentication.component";
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';

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
    data: { roles : ['ROLE_FREELANCER']}
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    data: { roles : ['ROLE_ADMIN']}
  },{
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
