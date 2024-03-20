import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssessmentComponent } from './pages/assessment/assessment.component';
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { FindProjectComponent } from "./pages/find-project/find-project.component";
import { FreelancerLandingComponent } from "./pages/freelancer-landing/freelancer-landing.component";
import { MyBidsComponent } from "./pages/my-bids/my-bids.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { ProjectInfoComponent } from "./pages/project-info/project-info.component";
import { QuizAppComponent } from "./pages/quiz-app/quiz-app.component";
import { QuizInfoComponent } from "./pages/quiz-info/quiz-info.component";

const routes: Routes = [
  {
    path: "",
    component: FreelancerLandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "assessment/:testId",
        component: QuizInfoComponent
      },
      {
        path: "assessment/start/:testId",
        component: QuizAppComponent
      },
      {
        path: "skills",
        component: AssessmentComponent
      },
      {
        path: "projects",
        component: FindProjectComponent
      },
      {
        path: "project/:id",
        component: ProjectInfoComponent
      },
      {
        path: "bids",
        component: MyBidsComponent
      },
      {
        path: "orders",
        component: OrdersComponent
      },
      {
        path: "profile",
        loadChildren: () => import("../profile/profile.module").then(m => m.ProfileModule)
      }
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreelancerRoutingModule {
}
