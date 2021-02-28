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
import { MainModalComponent } from 'src/app/core/components/main-modal/main-modal.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MainModalModule } from 'src/app/core/components/main-modal/main-modal.module';
import { DocumentModule } from '../shared/document/document.module';

@NgModule({
  declarations: [
    CandidatComponent, CandidatFormComponent, PortfolioComponent
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
    ExperienceModule,
    MainModalModule,
    DocumentModule
  ],
  exports: [
    CandidatComponent, CandidatFormComponent, PortfolioComponent
  ],
  entryComponents: [
    MainModalComponent
  ],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class CandidatModule { }
