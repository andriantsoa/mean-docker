import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Statut } from 'src/app/commun/enum/role.enum';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {
  @Input() user: any;
  @Input() candidat: any;
  public Statut = Statut;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Output() update: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  public format(str: string): string {
    return str.replace('_', ' ');
  }

  public openCandidatForm(): void {
    this.update.emit(true);
  }
}
