import {Component, EventEmitter, Input, Output} from '@angular/core';

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
  constructor() { }


  ngOnInit(): void {
  }

  openDialog() {
    this.editProfile.emit();
  }
}
