import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsakoLoginComponent } from '../commun/components/asako-login/asako-login.component';
import { AsakoRegistrationComponent } from '../commun/components/asako-registration/asako-registration.component';
import { LayoutComponent } from '../core/layout/layout.component';
import { AsakoComponent } from './asako.component';

const publicRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: AsakoComponent
      }
    ]
  },
  {
    path: 'login',
    component: AsakoLoginComponent
  },
  {
    path: 'register',
    component: AsakoRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(publicRoutes)],
  exports: [RouterModule]
})
export class AsakoPublicRoutingModule {}
