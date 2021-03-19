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
  @Input() zoomAll: boolean = false;

  public StatutValue = StatutValue;

  constructor() { }

  ngOnInit(): void {
    if (this.zoomAll && this.jobOffers) {
      this.jobOffers.forEach(this.zoomJobDetails)
    }
  }

  public zoomJobDetails(jobOffer: IJobOffer): void {
    jobOffer.zoom = !jobOffer.zoom;
  }

}
