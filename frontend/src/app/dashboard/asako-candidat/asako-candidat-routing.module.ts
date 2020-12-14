import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsakoCandidatComponent } from './asako-candidat.component';

const candidatRoutes: Routes = [
  {
    path: ':id',
    component: AsakoCandidatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(candidatRoutes)],
  exports: [RouterModule]
})
export class CandidatRoutingModule { }
