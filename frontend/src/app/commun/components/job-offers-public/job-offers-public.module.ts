import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { JobOffersPublicComponent } from './job-offers-public.component';
import { JobOffersModule } from '../job-offers/job-offers.module';

@NgModule({
  declarations: [
    JobOffersPublicComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    JobOffersModule,
  ],
  exports: [
    JobOffersPublicComponent
  ]
})
export class JobOffersPublicModule { }
