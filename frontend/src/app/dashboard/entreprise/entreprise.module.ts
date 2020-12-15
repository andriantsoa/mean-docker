import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntrepriseComponent } from './entreprise.component';
import { EntrepriseRoutingModule } from './entreprise-routing.module';

@NgModule({
  declarations: [EntrepriseComponent],
  imports: [
    CommonModule,
    EntrepriseRoutingModule
  ]
})
export class EntrepriseModule { }
