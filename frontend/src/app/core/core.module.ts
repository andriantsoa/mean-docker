import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AlertComponent, AlertService, ValidationMessagesComponent, ValidationService } from './components/index';
import { AuthGuard } from './guards/index';
import { JwtInterceptorProvider, ErrorInterceptorProvider } from './helpers/index';
import { LayoutModule } from './layout/layout.module';
import { CandidatService, CryptoService, ProfilService, UserService } from './services';

@NgModule({
  imports: [
    CommonModule, HttpClientModule, LayoutModule
  ],
  declarations: [
    AlertComponent, ValidationMessagesComponent
  ],
  exports: [
    AlertComponent, ValidationMessagesComponent, LayoutModule
  ],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        AuthGuard,
        UserService, CryptoService, ProfilService, CandidatService,
        AlertService, ValidationService, JwtInterceptorProvider, ErrorInterceptorProvider
      ],
    };
  }
}
