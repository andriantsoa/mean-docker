import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsakoComponent } from './asako.component';

describe('AsakoComponent', () => {
  let component: AsakoComponent;
  let fixture: ComponentFixture<AsakoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsakoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsakoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
