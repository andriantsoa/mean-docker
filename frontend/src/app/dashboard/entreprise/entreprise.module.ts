import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EntrepriseComponent } from './entreprise.component';
import { EntrepriseRoutingModule } from './entreprise-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { EntrepriseFormComponent } from './entreprise-form/entreprise-form.component';
import { BandeauModule } from 'src/app/commun/components/bandeau/bandeau.module';
import { EntreprisePortfolioComponent } from './entreprise-portfolio/entreprise-portfolio.component';
import { OffreModule } from '../shared/offre/offre.module';

@NgModule({
  declarations: [EntrepriseComponent, EntrepriseFormComponent, EntreprisePortfolioComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    EntrepriseRoutingModule,
    BandeauModule,
    OffreModule
  ]
})
export class EntrepriseModule { }
