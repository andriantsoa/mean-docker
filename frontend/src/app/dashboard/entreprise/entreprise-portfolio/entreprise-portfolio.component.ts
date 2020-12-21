import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IEntreprise } from 'src/app/core/interfaces';
import { Statut } from 'src/app/commun/enum/role.enum';

@Component({
  selector: 'app-entreprise-portfolio',
  templateUrl: './entreprise-portfolio.component.html',
  styleUrls: ['./entreprise-portfolio.component.scss']
})
export class EntreprisePortfolioComponent {
  public Statut = Statut;
  @Input() entreprise: IEntreprise;
  @Output() update: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public openUpdateForm(): void {
    this.update.emit(true);
  }

}
