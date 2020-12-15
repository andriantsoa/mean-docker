import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EntrepriseComponent } from './entreprise.component';

const entrepriseRoutes: Routes = [
  {
    path: ':id',
    component: EntrepriseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(entrepriseRoutes)],
  exports: [RouterModule]
})
export class EntrepriseRoutingModule { }
