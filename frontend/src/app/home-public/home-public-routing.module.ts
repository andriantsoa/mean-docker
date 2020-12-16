import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from '../commun/components/user-login/user-login.component';
import { UserRegistrationComponent } from '../commun/components/user-registration/user-registration.component';
import { LayoutComponent } from '../core/layout/layout.component';
import { HomePublicComponent } from './home-public.component';

const publicRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomePublicComponent
      }
    ]
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'register',
    component: UserRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(publicRoutes)],
  exports: [RouterModule]
})
export class HomePublicRoutingModule { }
