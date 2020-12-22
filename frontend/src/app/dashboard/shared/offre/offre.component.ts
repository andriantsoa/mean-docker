import { Component, Input, OnInit } from '@angular/core';
import { IOffre } from 'src/app/core/interfaces';

@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.scss']
})
export class OffreComponent implements OnInit {
  @Input() offre: IOffre;

  constructor() { }

  ngOnInit(): void {
  }

}
