import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateComponent } from './components/update/update.component';
import { EmployerComponent } from './employer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProjectComponent } from './pages/project/project.component';
import { ViewBidsComponent } from "./pages/view-bids/view-bids.component";
import { ViewProjectsComponent } from "./pages/view-projects/view-projects.component";

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
      },
      {
        path:"project/:id/edit",
        component: ProjectComponent
      },
      {
        path:"projects",
        component: ViewProjectsComponent
      },{
        path:"bids/:id",
        component: ViewBidsComponent
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
