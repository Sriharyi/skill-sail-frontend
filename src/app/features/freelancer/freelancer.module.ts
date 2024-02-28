import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FreelancerRoutingModule } from './freelancer-routing.module';
import { FreelancerLandingComponent } from './pages/freelancer-landing/freelancer-landing.component';


@NgModule({
  declarations: [
    FreelancerLandingComponent
  ],
  imports: [
    CommonModule,
    FreelancerRoutingModule
  ]
})
export class FreelancerModule { }
