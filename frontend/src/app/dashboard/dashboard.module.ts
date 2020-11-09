import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsakoCandidatComponent } from './asako-candidat/asako-candidat.component';
import { AsakoEnterpriseComponent } from './asako-enterprise/asako-enterprise.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CoreModule } from '../core/core.module';

const components = [
  AsakoCandidatComponent,
  AsakoEnterpriseComponent,
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule.forRoot()
  ]
})
export class DashboardModule { }
