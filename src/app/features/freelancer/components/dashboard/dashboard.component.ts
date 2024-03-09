import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  filters: string[] = [

  ];
  searchText: string = "";
  heroImageUrl: any = "";
  userName: string= "sriharyi";


  removeFilter(filter: string) {
      console.log(filter);
  }
}
