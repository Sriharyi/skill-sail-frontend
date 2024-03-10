import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import Swal from "sweetalert2";
import { BidService } from "../../../../core/services/employer/bid-service";
import { EmployerBidResponse } from "../../../../shared/models/employer/employer-bid";
@Component({
  selector: 'app-view-bids',
  templateUrl: './view-bids.component.html',
  styleUrls: ['./view-bids.component.scss']
})
export class ViewBidsComponent {

  private destroy$ = new Subject<void>();

  displayedColumns: string[] = ['position', 'freelancerName', 'proposal', 'bidAmount', 'action'];
  dataSource = new MatTableDataSource<EmployerBidResponse>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  projectId = "";
  bids: EmployerBidResponse[] = [];
  constructor(route: ActivatedRoute, private bidService: BidService, private changeDetectorRef: ChangeDetectorRef, private router: Router) {
    this.projectId = route.snapshot.params['id'];
  }


  ngAfterViewInit() {
    this.bidService.getBidsByProjectId(this.projectId)
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


  //hire freelancer
  openDialog(bidId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to hire this freelancer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, hire!',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'No, cancel!',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.bidService.hireFreelancer(bidId)
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (data) => {
              Swal.fire(
                {
                  title: 'Hired!',
                  text: 'You have hired the freelancer',
                  icon: 'success',
                  confirmButtonColor: '#3085d6'
                }
              ).then(
                () => this.router.navigate(['/employer/projects'], { queryParams: { status: 'active' } })
              )
            },
            error: (err) => console.error(err),
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          {
            title: 'Cancelled',
            text: 'You have cancelled the hiring process',
            icon: 'error',
            color: '#d33',
            confirmButtonColor: '#3085d6'
          }
        )
      }
    })
  }
}
