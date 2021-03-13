import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Statut } from 'src/app/commun/enum/role.enum';
import { CategorieDoc } from 'src/app/commun/enum/doc-categorie.enum';
import { MainModalComponent } from 'src/app/core/components/main-modal/main-modal.component';
import { ICandidat, IUser } from 'src/app/core/interfaces';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  public Statut = Statut;
  public CategorieDoc = CategorieDoc;
  @Input() user: IUser;
  @Input() candidat: ICandidat;
  @Output() update: EventEmitter<boolean> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  public format(str: string): string {
    return str.replace('_', ' ');
  }

  public openCandidatForm(): void {
    this.update.emit(true);
  }

  public addDocument(): void {
    const dialogRef = this.dialog.open(MainModalComponent, {
      width: '80%',
      height: '80%',
      panelClass: 'mat-dialog-popin',
      data: {
        addDocument: true,
        candidat: this.candidat
      }
    });

    // retour quand on ferme le modal
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
