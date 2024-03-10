import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {EmployerBidResponse} from "../../../../shared/models/employer/employer-bid";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from "@angular/material/sort";
import {FreelancerBidResponse} from "../../../../shared/models/freelancer/bid";
import {BidService} from "../../../../core/services/employer/bid-service";

@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.scss']
})
export class MyBidsComponent {
  displayedColumns: string[] = ['position','projectName', 'companyName','bidDeadline', 'bidAmount', 'status'];
  dataSource = new MatTableDataSource<FreelancerBidResponse>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  bids: FreelancerBidResponse[] = [];
  constructor(private bidService:BidService,private changeDetectorRef: ChangeDetectorRef) {

  }

  ngAfterViewInit() {
    this.bidService.getBidsByFreelancerId().subscribe({
      next: (response) => {
        if(response) {
          this.bids = response;
          this.dataSource = new MatTableDataSource(this.bids);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.changeDetectorRef.detectChanges();
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

}
