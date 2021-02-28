import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OffreComponent } from './offre.component';
import { OffreFormComponent } from './offre-form/offre-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { CompetenceModule } from '../competence/competence.module';
import { FormationModule } from '../formation/formation.module';
import { MainModalModule } from 'src/app/core/components/main-modal/main-modal.module';

@NgModule({
  declarations: [OffreComponent, OffreFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CompetenceModule,
    FormationModule
  ],
  exports: [OffreComponent, OffreFormComponent]
})
export class OffreModule { }
