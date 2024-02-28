import {Component, Input} from '@angular/core';
import {Education} from "../../../../shared/models/profile/education";

@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.scss']
})
export class ProfileAboutComponent {
  @Input()
  description = "I am a full stack developer";
  @Input()
  skills = ["Angular", "NodeJS", "MongoDB"];
  @Input()
  educations :Education[] = [
    {
      location: "India",
      collegeName: "Sri Krishna College of Engineering and Technology",
      degree: "Bachelors",
      major: "Computer Science and Engineering",
      graduationYear: 2019
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
