import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsakoRegistrationComponent } from './asako-registration.component';

describe('AsakoRegistrationComponent', () => {
  let component: AsakoRegistrationComponent;
  let fixture: ComponentFixture<AsakoRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsakoRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsakoRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
