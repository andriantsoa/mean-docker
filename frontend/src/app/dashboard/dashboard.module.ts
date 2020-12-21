import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CoreModule } from '../core/core.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material/material.module';
import { CandidatModule } from './candidat/candidat.module';
import { SharedModule } from './shared/shared.module';
import { EntrepriseModule } from './entreprise/entreprise.module';

import { UserValidationComponent } from './user-validation/user-validation.component';
import { ProfilModule } from './profil/profil.module';

const components = [
  UserValidationComponent
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
    EntrepriseModule,
    SharedModule,
    ProfilModule
  ],
  exports: [
    ...components
  ]
})
export class DashboardModule { }
