import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainModalComponent } from './main-modal.component';
import {
  MatFormFieldModule, MAT_DIALOG_DATA, MatDialogRef, MatListModule,
  MatAutocompleteModule, MatSnackBarModule, MatInputModule, MatDialogModule
} from '@angular/material';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('MainModalComponent', () => {
  let component: MainModalComponent;
  let fixture: ComponentFixture<MainModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatDialogModule,
        MatListModule, MatAutocompleteModule, MatSnackBarModule, MatInputModule],
      declarations: [MainModalComponent, SnackbarComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
