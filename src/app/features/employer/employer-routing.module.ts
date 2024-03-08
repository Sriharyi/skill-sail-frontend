import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployerComponent } from './employer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UpdateComponent } from './components/update/update.component';
import { ProjectComponent } from './pages/project/project.component';

const routes: Routes = [
  {
    path:"",
    component: EmployerComponent,
    children:[
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path:"dashboard",
        component: DashboardComponent
      },
      {
        path:"profile",
        component: ProfileComponent
      },
      {
        path:":id/edit",
        component: UpdateComponent
      },
      {
        path:"project/create",
        component: ProjectComponent
      }
    
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
