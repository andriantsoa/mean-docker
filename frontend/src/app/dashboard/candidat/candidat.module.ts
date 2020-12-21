import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

import { CandidatRoutingModule } from './candidat-routing.module';
import { CandidatComponent } from './candidat.component';
import { CandidatFormComponent } from './candidat-form/candidat-form.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BandeauModule } from 'src/app/commun/components/bandeau/bandeau.module';
import { FormationModule } from '../shared/formation/formation.module';
import { CompetenceModule } from '../shared/competence/competence.module';
import { ExperienceModule } from '../shared/experience/experience.module';

@NgModule({
  declarations: [
    CandidatComponent, CandidatFormComponent, PortfolioComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CandidatRoutingModule,
    MaterialModule,
    BandeauModule,
    FormationModule,
    CompetenceModule,
    ExperienceModule
  ],
  exports: [
    CandidatComponent, CandidatFormComponent, PortfolioComponent
  ]
})
export class CandidatModule { }
