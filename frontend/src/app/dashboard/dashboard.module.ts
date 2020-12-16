import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material/material.module';
import { CandidatModule } from './candidat/candidat.module';
import { EntrepriseModule } from './entreprise/entreprise.module';

import { UserValidationComponent } from './user-validation/user-validation.component';
import { ProfilFormComponent } from './profil-form/profil-form.component';

const components = [
  UserValidationComponent,
  ProfilFormComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MaterialModule,
    RouterModule,
    CoreModule.forRoot(),
    CandidatModule,
    EntrepriseModule
  ],
  exports: [
    ...components
  ]
})
export class DashboardModule { }
