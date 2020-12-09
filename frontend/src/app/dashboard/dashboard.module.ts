import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { CoreModule } from '../core/core.module';

import { AsakoCandidatComponent } from './asako-candidat/asako-candidat.component';
import { AsakoEnterpriseComponent } from './asako-enterprise/asako-enterprise.component';
import { UserValidationComponent } from './user-validation/user-validation.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfilFormComponent } from './profil-form/profil-form.component';
import { FormationComponent } from './shared/formation/formation.component';
import { ExperienceComponent } from './shared/experience/experience.component';
import { CompetenceComponent } from './shared/competence/competence.component';
import { CandidatFormComponent } from './candidat-form/candidat-form.component';

const components = [
  AsakoCandidatComponent,
  AsakoEnterpriseComponent,
  UserValidationComponent,
  ProfilFormComponent,
  FormationComponent,
  ExperienceComponent,
  CompetenceComponent,
  CandidatFormComponent,
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
    CoreModule.forRoot()
  ]
})
export class DashboardModule { }
