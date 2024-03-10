import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BidService} from "../../../../core/services/employer/bid-service";
import {EmployerBidResponse} from "../../../../shared/models/employer/employer-bid";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import Swal from "sweetalert2";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
@Component({
  selector: 'app-view-bids',
  templateUrl: './view-bids.component.html',
  styleUrls: ['./view-bids.component.scss']
})
export class ViewBidsComponent {

    private  destroy$ = new Subject<void>();

    displayedColumns: string[] = ['position','freelancerName', 'proposal', 'bidAmount', 'action'];
    dataSource = new MatTableDataSource<EmployerBidResponse>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

    projectId = "";
    bids: EmployerBidResponse[] = [];
    constructor(route: ActivatedRoute, private bidService:BidService,private changeDetectorRef: ChangeDetectorRef) {
      this.projectId = route.snapshot.params['id'];
    }


    ngAfterViewInit() {
      this.bidService.getBidsByProjectId(this.projectId).subscribe({
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

    ngOnDestroy() {
      this.destroy$.next();
      this.destroy$.complete();
    }

  applyFilter($event: KeyboardEvent) {

  }



  //hire freelancer
  openDialog(bidId:string) {
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
        this.bidService.hireFreelancer(bidId).subscribe({
          next: (data) => {
            Swal.fire(
              {
                title: 'Hired!',
                text: 'You have hired the freelancer',
                icon: 'success',
                confirmButtonColor: '#3085d6'
              }
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
