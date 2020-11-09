import { Component, Input, OnInit } from '@angular/core';
import { IJobOffer } from '../../interfaces/job-offer.interface';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.scss']
})
export class JobOffersComponent implements OnInit {

  @Input() jobOffers: IJobOffer[];

  constructor() { }

  ngOnInit(): void {
  }

  public zoomJobDetails(jobOffer: IJobOffer): void {
    jobOffer.zoom = !jobOffer.zoom;
  }

}
