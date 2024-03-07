import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmpProfileService } from 'src/app/core/services/employer/emp-profile.service';
import { EmployerProfile } from 'src/app/shared/models/employer/emp-profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {


    profile: EmployerProfile = EmployerProfile.createEmpty();

    constructor(private employerService: EmpProfileService,private router: Router) { 

    }

    ngOnInit(): void {
      this.employerService.getProfile().subscribe(response => {
        this.profile = response;
      });

    }

    onEditProfile($event: void) {
      const id = this.profile.id;
      this.router.navigate([`/employer/${id}/edit`]);
    }


    

}
