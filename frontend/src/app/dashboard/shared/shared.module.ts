import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetenceModule } from './competence/competence.module';
import { ExperienceModule } from './experience/experience.module';
import { FormationModule } from './formation/formation.module';
import { OffreModule } from './offre/offre.module';
import { DocumentModule } from './document/document.module';

@NgModule({
  imports: [
    CommonModule,
    CompetenceModule,
    ExperienceModule,
    FormationModule,
    OffreModule,
    DocumentModule
  ],
  exports: [
    OffreModule,
    CompetenceModule,
    ExperienceModule,
    FormationModule,
    DocumentModule,
  ]
})
export class SharedModule { }
