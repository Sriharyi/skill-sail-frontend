import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { ProfileService } from 'src/app/core/services/profile/profile.service';
import { FreelancerProfile } from "../../../../shared/models/profile/freelancer-profile";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  private destroy$: Subject<void> = new Subject<void>();
  profile: FreelancerProfile = FreelancerProfile.createInitial();
  constructor(private router: Router, private ProfileService: ProfileService) {

  }
  ngOnInit(): void {
    this.ProfileService.getProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe((profile) => {
        this.profile = profile;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  update() {
    const id = this.profile.id;
    this.router.navigate([`/freelancer/profile/${id}/edit`]);
  }
}
