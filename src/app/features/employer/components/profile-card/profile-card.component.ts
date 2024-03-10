import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmpProfileService } from 'src/app/core/services/employer/emp-profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {

  @Input()
  companyName = 'Company Name';

  @Input()
  companyLogo = 'assets/images/profile/avatar.png';

  @Output()
  editProfile = new EventEmitter<void>();

  public profilePicture: string | ArrayBuffer | null | undefined;



  constructor(private profileService: EmpProfileService) { }


  ngOnInit(): void {
  }

  openDialog() {
    this.editProfile.emit();
  }

  onFileSelected($event: Event) {
    const file: File = ($event.target as HTMLInputElement).files![0];

    if (file) {
      // Check the file type
      if (!file.type.startsWith('image/')) {
        Swal.fire('Error', 'Please select an image file', 'error');
        return;
      }

      // Check the file size (5MB in this example)
      if (file.size > 5000000) {
        Swal.fire('Error', 'File size exceeds 5MB', 'error');
        return;
      }

      // update the profile picture
      this.profileService.updateProfilePicture(file).subscribe({
        next: (response) => {
          this.companyLogo = response;
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });

    }
  }

}
