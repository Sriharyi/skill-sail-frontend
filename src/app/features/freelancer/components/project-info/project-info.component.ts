import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../../../core/services/employer/project.service";
import {EmpProfileService} from "../../../../core/services/employer/emp-profile.service";
import {ProjectResponse} from "../../../../shared/models/employer/project-create";
import {EmployerProfile} from "../../../../shared/models/employer/emp-profile";
import {MatDialog} from "@angular/material/dialog";
import {BidCreateComponent} from "../bid-create/bid-create.component";
import {BidService} from "../../../../core/services/employer/bid-service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent {

  public project: ProjectResponse;

  public employer: EmployerProfile;
  bids:any[] = [
    {
      bidder: 'John Doe',
      bidAmount: 100,
      description: 'I am a professional web developer with 5 years of experience. I can deliver the project within 5 days.'
    }
  ];
  constructor(private route:ActivatedRoute,private projectService:ProjectService,private employerService:EmpProfileService,private matDialog:MatDialog,private bidService:BidService) {
      this.employer = EmployerProfile.fromJson({});
      this.project = {
      id: '',
      freelancerProfileId: '',
      title: '',
      description: '',
      employerProfileId: '',
      category: '',
      skills: [],
      budget: 0,
      deadline: '',
      bidDeadline: '',
      status: ''
    };
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.projectService.getProjectById(id).subscribe({
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

  openBidDialog() {

    //write logic whether the user can bid or not
    //based on the skills acquired by the user
    //also check if the user is already bidded
    //if the user is already bidded, then show the bid details
    //if the user is not bidded, then show the bid form

    this.matDialog.open(BidCreateComponent, {
      width: '800px',
      height: '500px',
    }).afterClosed().subscribe({
        next: (response) => {

          if (response) {

            const bidRequest = {
              projectId: this.project.id,
              freelancerId: '',
              bidAmount: response.bidAmount,
              proposal: response.proposal
            }

            this.bidService.createBid(bidRequest).subscribe({
              next: (response) => {
                Swal.fire('Success', 'Bid created successfully', 'success');
              }

            });
          }
        }
      });
  }
}
