import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BidService } from "../../../../core/services/employer/bid-service";
import { FreelancerBidResponse } from "../../../../shared/models/freelancer/bid";

@Component({
  selector: 'app-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.scss']
})
export class MyBidsComponent {
  displayedColumns: string[] = ['position', 'projectName', 'companyName', 'bidDeadline', 'bidAmount', 'status'];
  dataSource = new MatTableDataSource<FreelancerBidResponse>();
  private destroy$: Subject<void> = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  bids: FreelancerBidResponse[] = [];
  constructor(private bidService: BidService, private changeDetectorRef: ChangeDetectorRef) {

  }

  ngAfterViewInit() {
    this.bidService.getBidsByFreelancerId()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
