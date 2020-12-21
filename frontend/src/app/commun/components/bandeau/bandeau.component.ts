import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bandeau',
  templateUrl: './bandeau.component.html',
  styleUrls: ['./bandeau.component.scss']
})
export class BandeauComponent implements OnInit {

  @Input() title = 'TITRE';
  constructor() { }

  ngOnInit(): void {
  }

}
