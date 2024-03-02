import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerLandingComponent } from './freelancer-landing.component';

describe('FreelancerLandingComponent', () => {
  let component: FreelancerLandingComponent;
  let fixture: ComponentFixture<FreelancerLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreelancerLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreelancerLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
