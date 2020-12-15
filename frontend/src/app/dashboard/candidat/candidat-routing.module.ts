import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatComponent } from './candidat.component';

const candidatRoutes: Routes = [
  {
    path: ':id',
    component: CandidatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(candidatRoutes)],
  exports: [RouterModule]
})
export class CandidatRoutingModule { }
