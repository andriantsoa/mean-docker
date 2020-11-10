import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AsakoComponent } from './asako.component';
import { CommunModule } from '../commun/commun.module';
import { AsakoPublicRoutingModule } from './asako-public-routing.module';
import { CoreModule } from '../core/core.module';

const components = [
  AsakoComponent,
];

@NgModule({
  imports: [
    CommunModule,
    AsakoPublicRoutingModule,
    CoreModule.forRoot()
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
export class AsakoPublicModule { }
