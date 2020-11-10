import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsakoEnterpriseComponent } from './asako-enterprise.component';

describe('AsakoEnterpriseComponent', () => {
  let component: AsakoEnterpriseComponent;
  let fixture: ComponentFixture<AsakoEnterpriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsakoEnterpriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsakoEnterpriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
