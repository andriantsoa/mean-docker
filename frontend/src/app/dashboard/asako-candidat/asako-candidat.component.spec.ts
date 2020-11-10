import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsakoCandidatComponent } from './asako-candidat.component';

describe('AsakoCandidatComponent', () => {
  let component: AsakoCandidatComponent;
  let fixture: ComponentFixture<AsakoCandidatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsakoCandidatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsakoCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
