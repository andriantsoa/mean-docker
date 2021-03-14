import { Component, Input, OnInit } from '@angular/core';
import { StatutValue } from '../../enum/role.enum';
import { IJobOffer } from '../../interfaces/job-offer.interface';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.scss']
})
export class JobOffersComponent implements OnInit {
  @Input() jobOffers: IJobOffer[];
  public StatutValue = StatutValue;

  constructor() { }

  ngOnInit(): void {
  }

  public zoomJobDetails(jobOffer: IJobOffer): void {
    jobOffer.zoom = !jobOffer.zoom;
  }

}
