import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetenceComponent } from './competence.component';
import { MaterialModule } from '../../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CompetenceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [CompetenceComponent]
})
export class CompetenceModule { }
