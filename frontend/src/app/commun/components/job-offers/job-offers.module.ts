import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobOffersComponent } from './job-offers.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [JobOffersComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [JobOffersComponent],
})
export class JobOffersModule { }
