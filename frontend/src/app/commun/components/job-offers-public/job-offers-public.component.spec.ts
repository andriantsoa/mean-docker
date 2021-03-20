import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOffersPublicComponent } from './job-offers-public.component';

describe('JobOffersPublicComponent', () => {
  let component: JobOffersPublicComponent;
  let fixture: ComponentFixture<JobOffersPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOffersPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOffersPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
