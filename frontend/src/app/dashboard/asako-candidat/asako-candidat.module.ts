import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

import { CandidatRoutingModule } from './asako-candidat-routing.module';
import { AsakoCandidatComponent } from './asako-candidat.component';
import { CandidatFormComponent } from './candidat-form/candidat-form.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CompetenceComponent } from '../shared/competence/competence.component';
import { ExperienceComponent } from '../shared/experience/experience.component';
import { FormationComponent } from '../shared/formation/formation.component';

@NgModule({
  declarations: [
    AsakoCandidatComponent, CandidatFormComponent, FormationComponent, ExperienceComponent, CompetenceComponent, PortfolioComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CandidatRoutingModule,
    MaterialModule,
  ],
  exports: [
    AsakoCandidatComponent, CandidatFormComponent, FormationComponent, ExperienceComponent, CompetenceComponent, PortfolioComponent
  ]
})
export class AsakoCandidatModule { }
