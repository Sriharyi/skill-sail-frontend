import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { EmpProfileService } from 'src/app/core/services/employer/emp-profile.service';
import { EmployerProfile } from 'src/app/shared/models/employer/emp-profile';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  private destroy$ = new Subject<void>();

  profile: EmployerProfile = EmployerProfile.createEmpty();

  constructor(private employerService: EmpProfileService, private router: Router) {

  }

  ngOnInit(): void {
    this.employerService.getProfile()
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        this.profile = response;
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onEditProfile($event: void) {
    const id = this.profile.id;
    this.router.navigate([`/employer/${id}/edit`]);
  }




}
