import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HomePublicComponent } from './home-public.component';
import { CommunModule } from '../commun/commun.module';
import { HomePublicRoutingModule } from './home-public-routing.module';
import { CoreModule } from '../core/core.module';
import { RegisterInvitationComponent } from './register-invitation/register-invitation.component';
import { MaterialModule } from '../material/material.module';

const components = [
  HomePublicComponent,
  RegisterInvitationComponent,
];

@NgModule({
  imports: [
    CommunModule,
    HomePublicRoutingModule,
    CoreModule.forRoot(),
    MaterialModule
  ],
  declarations: [
    ...components,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [
    CommunModule,
    components,
  ]
})
export class HomePublicModule { }
