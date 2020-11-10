import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsakoLoginComponent } from './asako-login.component';

describe('AsakoLoginComponent', () => {
  let component: AsakoLoginComponent;
  let fixture: ComponentFixture<AsakoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsakoLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsakoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
