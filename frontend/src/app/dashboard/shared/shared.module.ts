import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetenceModule } from './competence/competence.module';
import { ExperienceModule } from './experience/experience.module';
import { FormationModule } from './formation/formation.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CompetenceModule,
    ExperienceModule,
    FormationModule
  ]
})
export class SharedModule { }
