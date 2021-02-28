import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainModalComponent } from './main-modal.component';
import { DocumentModule } from 'src/app/dashboard/shared/document/document.module';
import { OffreModule } from 'src/app/dashboard/shared/offre/offre.module';

@NgModule({
  declarations: [
    MainModalComponent
  ],
  imports: [
    CommonModule, OffreModule, DocumentModule
  ],
  exports: [
    MainModalComponent
  ]
})
export class MainModalModule { }
