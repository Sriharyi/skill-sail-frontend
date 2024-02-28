import { Component } from '@angular/core';
import {FreelancerProfile} from "../../../../shared/models/profile/freelancer-profile";
import {MatDialog} from "@angular/material/dialog";
import {ProfileUpdateComponent} from "../../components/profile-update/profile-update.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profile:FreelancerProfile;
  constructor(
   public dialog: MatDialog
  ) {
    this.profile = new FreelancerProfile("1", "https://via.placeholder.com/150", "Sriharyi C", "sriharyi", "I am a full stack developer", ["Angular", "NodeJS", "MongoDB"], [
      {
        location: "India",
        collegeName: "Sri Krishna College of Engineering and Technology",
        degree: "Bachelors",
        major: "Computer Science and Engineering",
        graduationYear: 2020
      }
    ]);
  }
  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(ProfileUpdateComponent, {
        width: '600px',
        height: '600px',
      }
      );
  }
}
