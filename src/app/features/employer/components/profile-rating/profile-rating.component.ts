import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-rating',
  templateUrl: './profile-rating.component.html',
  styleUrls: ['./profile-rating.component.scss']
})
export class ProfileRatingComponent {
  rating: string = '4.5';
}
