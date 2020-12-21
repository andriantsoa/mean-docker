import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/guards';
import { HomePublicComponent } from '../home-public/home-public.component';
import { LayoutComponent } from '../core/layout/layout.component';
import { UserValidationComponent } from './user-validation/user-validation.component';

const boardRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: HomePublicComponent
      },
      {
        path: 'validation',
        canActivate: [AuthGuard],
        component: UserValidationComponent
      },
      {
        path: 'profil',
        canActivate: [AuthGuard],
        loadChildren: () => import('./profil/profil.module').then((module) => module.ProfilModule)
      },
      {
        path: 'candidat',
        canActivate: [AuthGuard],
        loadChildren: () => import('./candidat/candidat.module').then((module) => module.CandidatModule)
      },
      {
        path: 'entreprise',
        canActivate: [AuthGuard],
        loadChildren: () => import('./entreprise/entreprise.module').then((module) => module.EntrepriseModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(boardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
