import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AlertComponent, AlertService, BottomSheetComponent, MainModalComponent, SnackbarComponent, ValidationMessagesComponent, ValidationService } from './components/index';
import { AuthGuard } from './guards/index';
import { JwtInterceptorProvider, ErrorInterceptorProvider } from './helpers/index';
import { LayoutModule } from './layout/layout.module';
import { CandidatService, CryptoService, EntrepriseService, OffreService, ProfilService, UserService } from './services';
import { OffreModule } from '../dashboard/shared/offre/offre.module';

@NgModule({
  imports: [
    CommonModule, HttpClientModule, LayoutModule, OffreModule
  ],
  declarations: [
    AlertComponent, ValidationMessagesComponent, MainModalComponent, SnackbarComponent, BottomSheetComponent
  ],
  exports: [
    AlertComponent, ValidationMessagesComponent, LayoutModule, MainModalComponent, SnackbarComponent, BottomSheetComponent
  ],
  entryComponents: [MainModalComponent, SnackbarComponent, BottomSheetComponent],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        AuthGuard,
        UserService, CryptoService, ProfilService, CandidatService, EntrepriseService, OffreService,
        AlertService, ValidationService, JwtInterceptorProvider, ErrorInterceptorProvider
      ],
    };
  }
}
