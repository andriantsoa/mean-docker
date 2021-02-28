import { Component, Input, OnInit } from '@angular/core';
import { IOffre } from 'src/app/core/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { MainModalComponent } from 'src/app/core/components/main-modal/main-modal.component';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.scss']
})
export class OffreComponent implements OnInit {
  @Input() entrepriseId: string;
  @Input() offre: IOffre;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  open_dialog_modal(str: string): void {
    const dialogRef = this.dialog.open(MainModalComponent, {
      width: '80%',
      height: '80%',
      panelClass: 'mat-dialog-popin',
      data: {
        str,
        entreprise: {
          _id: this.entrepriseId
        },
        offre: this.offre
      }
    });

    // retour quand on ferme le modal
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
