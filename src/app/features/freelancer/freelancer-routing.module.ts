import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FreelancerLandingComponent} from "./pages/freelancer-landing/freelancer-landing.component";

const routes: Routes = [
  {
    path:"",
    component: FreelancerLandingComponent
  },
  {
    path: 'profile',
    loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FreelancerRoutingModule { }
