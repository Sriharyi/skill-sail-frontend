import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import Swal from "sweetalert2";
import { BidService } from "../../../../core/services/employer/bid-service";
import { EmpProfileService } from "../../../../core/services/employer/emp-profile.service";
import { ProjectService } from "../../../../core/services/employer/project.service";
import { ProfileService } from "../../../../core/services/profile/profile.service";
import { EmployerProfile } from "../../../../shared/models/employer/emp-profile";
import { ProjectResponse } from "../../../../shared/models/employer/project-create";
import { BidCreateComponent } from "../../components/bid-create/bid-create.component";
@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent {

  private destroy$: Subject<void> = new Subject<void>();

  public project: ProjectResponse;

  public employer: EmployerProfile;
  bids:any[] = [
    {
      bidder: 'John Doe',
      bidAmount: 100,
      description: 'I am a professional web developer with 5 years of experience. I can deliver the project within 5 days.'
    }
  ];
  constructor(private route:ActivatedRoute,private projectService:ProjectService,private employerService:EmpProfileService,private matDialog:MatDialog,private bidService:BidService,private freelancerService: ProfileService,private router :Router) {
      this.employer = EmployerProfile.fromJson({});
      this.project = {
      id: '',
      freelancerProfileId: '',
      title: '',
      description: '',
      fileUrl: '',
      thumbnail: '',
      employerProfileId: '',
      category: '',
      skills: [],
      budget: 0,
      deadline: new Date(),
      bidDeadline: new Date(),
      status: ''
    };
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.projectService.getProjectById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (response) => {
        const employerId = response.employerProfileId;
        this.employerService.getProfilebyId(employerId).subscribe({
          next: (response) => {
            this.employer = response;
          }
        })
        this.project = response;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openBidDialog() {

    this.freelancerService.getProfileWithEarnedSkills()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: (response) => {
        if (response.skills.length > 0) {
          const freelancerSkills = response.skills;
          const projectSkills = this.project.skills;
          console.log(freelancerSkills);
          console.log(projectSkills);
          const isFreelancerHasSkills = projectSkills.every(skill => freelancerSkills.includes(skill));
          if(isFreelancerHasSkills){
            this.isAgainBid();
          } else {
            Swal.fire('Error', 'You need to acquire skills to bid', 'error').then(
              () => {
                this.router.navigate(['/freelancer/skills']);
              }
            )
          }
        } else {
          Swal.fire('Error', 'You need to acquire skills to bid', 'error').then(
            () => {
              this.router.navigate(['/freelancer/skills']);
            }
          )
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  isAgainBid() {
    this.bidService.isalreadyBidded(this.project.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            Swal.fire('Error', 'You have already bidded for this project', 'error');
          } else {
            this.openMatDialog();
          }
        }
      });
  }

  openMatDialog() {
    this.matDialog.open(BidCreateComponent, {
      width: '800px',
      height: '500px',
    }).afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {

          if (response) {

            const bidRequest = {
              projectId: this.project.id,
              freelancerId: '',
              bidAmount: response.bidAmount,
              proposal: response.proposal
            }

            this.bidService.createBid(bidRequest)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (response) => {
                  Swal.fire('Success', 'Bid created successfully', 'success');
                }

              });
          }
        }
      });
  }
}
