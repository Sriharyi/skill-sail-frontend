import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileBadgesComponent } from './profile-badges.component';

describe('ProfileBadgesComponent', () => {
  let component: ProfileBadgesComponent;
  let fixture: ComponentFixture<ProfileBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileBadgesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
