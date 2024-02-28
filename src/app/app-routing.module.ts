import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from "./features/authentication/authentication.component";

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
  },
  // {
  //   path: 'client',
  //   loadChildren: () => import('./features/client/client.module').then(m => m.ClientModule),
  // }
  // {
  //   path: 'admin',
  //   loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
  // },
  // {
  //   path: '404',
  //   loadChildren: () => import('./features/not-found/not-found.module').then(m => m.NotFoundModule),
  // },
  // {
  //   path: '**',
  //   redirectTo: '404'
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
