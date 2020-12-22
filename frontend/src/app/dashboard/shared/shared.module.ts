import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetenceModule } from './competence/competence.module';
import { ExperienceModule } from './experience/experience.module';
import { FormationModule } from './formation/formation.module';
import { OffreModule } from './offre/offre.module';

@NgModule({
  imports: [
    CommonModule,
    CompetenceModule,
    ExperienceModule,
    FormationModule,
    OffreModule
  ]
})
export class SharedModule { }
