import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-asako-enterprise',
  templateUrl: './asako-enterprise.component.html',
  styleUrls: ['./asako-enterprise.component.css']
})
export class AsakoEnterpriseComponent implements OnInit {
  public enterprise: { id: string; };

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.enterprise = {
      id,
    };
  }

}
