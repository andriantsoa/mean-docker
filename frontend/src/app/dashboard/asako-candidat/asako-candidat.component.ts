import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-asako-candidat',
  templateUrl: './asako-candidat.component.html',
  styleUrls: ['./asako-candidat.component.css']
})
export class AsakoCandidatComponent implements OnInit {
  public candidat: { id: string; };

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.candidat = {
      id,
    };
  }

}
