import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FreelancerProfile } from "../../../../shared/models/profile/freelancer-profile";
import { ProfileService } from 'src/app/core/services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profile: FreelancerProfile = FreelancerProfile.createInitial();
  constructor(private router: Router,private ProfileService:ProfileService) {
   
  }
  ngOnInit(): void {
    this.ProfileService.getProfile().subscribe((profile) => {
      this.profile = profile;
    });
  }

  update() {
    const id = this.profile.id;
    this.router.navigate([`/freelancer/profile/${id}/edit`]);
  }
}
