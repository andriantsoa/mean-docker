import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IEntreprise } from '../../interfaces';

// import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-main-modal',
  templateUrl: './main-modal.component.html',
  styleUrls: ['./main-modal.component.scss']
})
export class MainModalComponent implements OnInit {
  public entreprise: IEntreprise;

  constructor(
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MainModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data.entreprise);

    this.entreprise = data ? data.entreprise : null;
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
  }

  // open_snackbar(type: string, message: string) {
  //   const data = {
  //     type,
  //     message
  //   };
  //   this.snackBar.openFromComponent(SnackbarComponent, {
  //     data,
  //     duration: 3000
  //   });
  // }
}
