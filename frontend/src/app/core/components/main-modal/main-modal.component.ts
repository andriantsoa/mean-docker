import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { ICandidat, IEntreprise, IOffre } from '../../interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-modal',
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.scss']
})
export class MainModalComponent implements OnInit {
  public entreprise: IEntreprise;
  public candidat: ICandidat;
  public offre: IOffre;
  public addDocument: boolean;
  constructor(
    public snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MainModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.entreprise = data ? data.entreprise : null;
    this.offre = data ? data.offre : null;
    this.addDocument = data.addDocument;
    this.candidat = data ? data.candidat : null;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close(
      {
        event: 'close',
        data: {
          from: 'Andry',
          param: 'OKOK'
        }
      });
    this.open_snackbar('success', 'fermeture');
  }

  open_snackbar(type: string, message: string) {
    const data = {
      type,
      message
    };
    this.snackBar.openFromComponent(SnackbarComponent, {
      data,
      duration: 3000
    });
  }

  update_entreprise(value: boolean): void {
    this.router.navigate(['/dashboard/entreprise', this.entreprise._id]);
    this.closeDialog();
  }

  addDocuments(value: boolean): void {
    this.router.navigate(['/dashboard/candidat', this.candidat._id]);
    this.closeDialog();
  }
}
