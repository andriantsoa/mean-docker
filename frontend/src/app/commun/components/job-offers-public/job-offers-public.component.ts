import { Component, Input } from '@angular/core';
import { IJobOffer } from '../../interfaces/job-offer.interface';

@Component({
  selector: 'app-job-offers-public',
  templateUrl: './job-offers-public.component.html',
  styleUrls: ['./job-offers-public.component.scss']
})
export class JobOffersPublicComponent {
  @Input() publicJobOffers: IJobOffer[];
}
