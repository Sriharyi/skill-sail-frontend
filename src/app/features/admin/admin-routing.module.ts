import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CreateSkillComponent} from "./components/create-skill/create-skill.component";
import {ManageSkillComponent} from "./components/manage-skill/manage-skill.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {
        path: "create-skill",
        component: CreateSkillComponent
      },
      {
        path: "manage-skill",
        component: ManageSkillComponent
      }],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
