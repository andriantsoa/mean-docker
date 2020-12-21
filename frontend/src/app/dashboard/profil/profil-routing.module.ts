import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfilFormComponent } from './profil-form/profil-form.component';

const profRoutes: Routes = [
  {
    path: ':id',
    component: ProfilFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(profRoutes)],
  exports: [RouterModule]
})
export class ProfilRoutingModule { }
