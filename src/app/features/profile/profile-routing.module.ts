import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { ProfileComponent } from "./pages/profile/profile.component";
import { AuthGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ":id/edit",
    component: ProfileUpdateComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
