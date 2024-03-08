import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile/profile.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {

  @Input()
  name = 'sriharyi';
  @Input()
  username = 'sriharyi';
  @Output()
  editProfile = new EventEmitter<void>();

  public profilePicture: string | ArrayBuffer | null | undefined;

  @Input()
  public avatar = "/assets/images/freelancer/freelancer-profile-picture.jpg";

  constructor(private profileService:ProfileService) { }


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
        alert('Invalid file type. Please select an image file.');
        return;
      }

      // Check the file size (5MB in this example)
      if (file.size > 5000000) {
        alert('File is too large. Please select a file smaller than 5MB.');
        return;
      }

      const user = JSON.parse(localStorage.getItem('USER')!);
      const id = user.id;

     // update the profile picture
      this.profileService.updateProfilePicture(id,file).subscribe({
        next: (response) => {
          this.avatar = response;
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });

    }
  }

}
