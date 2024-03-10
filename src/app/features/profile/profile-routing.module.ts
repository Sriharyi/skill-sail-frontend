import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { ProfileComponent } from "./pages/profile/profile.component";

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
  },
  {
    path: ":id/edit",
    component: ProfileUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
