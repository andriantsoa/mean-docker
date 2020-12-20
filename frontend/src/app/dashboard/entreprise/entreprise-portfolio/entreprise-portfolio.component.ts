import { Component, Input, OnInit } from '@angular/core';
import { IEntreprise } from 'src/app/core/interfaces';
import { Statut } from 'src/app/commun/enum/role.enum';

@Component({
  selector: 'app-entreprise-portfolio',
  templateUrl: './entreprise-portfolio.component.html',
  styleUrls: ['./entreprise-portfolio.component.scss']
})
export class EntreprisePortfolioComponent implements OnInit {
  public Statut = Statut;
  @Input() entreprise: IEntreprise;

  constructor() { }

  ngOnInit(): void {
  }

}
