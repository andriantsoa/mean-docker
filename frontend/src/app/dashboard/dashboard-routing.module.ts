import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsakoComponent } from '../asako-public/asako.component';
import { AuthGuard } from '../core/guards';
import { LayoutComponent } from '../core/layout/layout.component';
import { AsakoCandidatComponent } from './asako-candidat/asako-candidat.component';
import { AsakoEnterpriseComponent } from './asako-enterprise/asako-enterprise.component';

const publicRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: AsakoComponent
      },
      {
        path: 'candidat',
        canActivate: [AuthGuard],
        component: AsakoCandidatComponent
      },
      {
        path: 'entreprise',
        canActivate: [AuthGuard],
        component: AsakoEnterpriseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(publicRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
