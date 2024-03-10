import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.scss']
})
export class ProfileAboutComponent {

  @Input()
  companyEmail = '';
  @Input()
  companyWebsite = '';
  @Input()
  companyDescription = '';
  @Input()
  companyLocation = '';
  @Input()
  companyIndustry = '';

  constructor() { }
  ngOnInit(): void {
  }
}
