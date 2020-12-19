import { Component, Input, OnInit } from '@angular/core';
import { IEntreprise } from 'src/app/core/interfaces';

@Component({
  selector: 'app-entreprise-portfolio',
  templateUrl: './entreprise-portfolio.component.html',
  styleUrls: ['./entreprise-portfolio.component.scss']
})
export class EntreprisePortfolioComponent implements OnInit {
  @Input() entreprise: IEntreprise;

  constructor() { }

  ngOnInit(): void {
  }

}
