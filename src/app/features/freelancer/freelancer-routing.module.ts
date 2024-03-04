import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FreelancerLandingComponent} from "./pages/freelancer-landing/freelancer-landing.component";
import {QuizInfoComponent} from "./components/quiz-info/quiz-info.component";
import {QuizAppComponent} from "./components/quiz-app/quiz-app.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path:"",
    component: FreelancerLandingComponent,
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
        path:"test-info",
        component:QuizInfoComponent
      },
      {
        path:"test-quiz",
        component: QuizAppComponent
      }
    ],
    data: { roles : ['ROLE_FREELANCER']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreelancerRoutingModule { }
