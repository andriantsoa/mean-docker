import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';

import { AsakoRegistrationComponent } from './components/asako-registration/asako-registration.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { CarouselAutoComponent } from './components/carousel-auto/carousel-auto.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { AsakoLoginComponent } from './components/asako-login/asako-login.component';
import { RouterModule } from '@angular/router';
import { JobOffersComponent } from './components/job-offers/job-offers.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { LoginService } from './components/asako-login/login.service';

const components = [
  AsakoRegistrationComponent,
  AsakoLoginComponent,
  MenuBarComponent,
  SearchFormComponent,
  CarouselAutoComponent,
  ImageSliderComponent,
  JobOffersComponent,
  FooterBarComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgImageSliderModule,
    RouterModule,
  ],
  declarations: [
    ...components,
  ],
  providers: [
    LoginService
  ],
  exports: [
    ...components,
    NgImageSliderModule,
  ]
})
export class CommunModule { }
