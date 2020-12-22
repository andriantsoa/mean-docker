import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IEntreprise } from 'src/app/core/interfaces';
import { Statut } from 'src/app/commun/enum/role.enum';
import { MainModalComponent } from 'src/app/core/components';

@Component({
  selector: 'app-entreprise-portfolio',
  templateUrl: './entreprise-portfolio.component.html',
  styleUrls: ['./entreprise-portfolio.component.scss']
})
export class EntreprisePortfolioComponent {
  public Statut = Statut;
  @Input() entreprise: IEntreprise;
  @Output() update: EventEmitter<boolean> = new EventEmitter();

  constructor(public snackBar: MatSnackBar, public dialog: MatDialog) { }

  public openUpdateForm(): void {
    this.update.emit(true);
  }

  open_dialog_modal(): void {
    const dialogRef = this.dialog.open(MainModalComponent, {
      width: '80%',
      height: '80%',
      panelClass: 'mat-dialog-popin',
      data: {
        entreprise: this.entreprise,
        offre: null
      }
    });

    // retour quand on ferme le modal
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
