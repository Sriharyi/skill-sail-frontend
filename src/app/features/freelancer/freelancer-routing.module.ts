import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FreelancerLandingComponent} from "./pages/freelancer-landing/freelancer-landing.component";
import {QuizInfoComponent} from "./components/quiz-info/quiz-info.component";
import {QuizAppComponent} from "./components/quiz-app/quiz-app.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import { AssessmentComponent } from './components/assessment/assessment.component';

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
      },
      {
        path:"skills",
        component:AssessmentComponent
      },
      {
        path:"profile",
        loadChildren:()=>import("../profile/profile.module").then(m=>m.ProfileModule)
      }
    ],
   
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreelancerRoutingModule { }
