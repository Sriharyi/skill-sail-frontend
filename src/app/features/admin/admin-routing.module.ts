import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./admin.component";
import {CreateSkillComponent} from "./pages/create-skill/create-skill.component";
import {ManageSkillComponent} from "./pages/manage-skill/manage-skill.component";
import {DashboardInfoComponent} from "./pages/dashboard-info/dashboard-info.component";


const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      },
      {
        path: "dashboard",
        component: DashboardInfoComponent
      },
      {
        path: "skill/create",
        component: CreateSkillComponent
      },
      {
        path: "skills",
        component: ManageSkillComponent
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
