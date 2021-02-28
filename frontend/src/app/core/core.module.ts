import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AlertComponent, AlertService, BottomSheetComponent, SnackbarComponent, ValidationMessagesComponent, ValidationService } from './components/index';
import { AuthGuard } from './guards/index';
import { JwtInterceptorProvider, ErrorInterceptorProvider } from './helpers/index';
import { LayoutModule } from './layout/layout.module';
import { CandidatService, CryptoService, EntrepriseService, OffreService, ProfilService, UserService } from './services';
import { OffreModule } from '../dashboard/shared/offre/offre.module';
import { DocumentModule } from '../dashboard/shared/document/document.module';
import { MainModalModule } from './components/main-modal/main-modal.module';
import { MainModalComponent } from './components/main-modal/main-modal.component';

@NgModule({
  imports: [
    CommonModule, HttpClientModule, LayoutModule, OffreModule, DocumentModule, MainModalModule
  ],
  declarations: [
    AlertComponent, ValidationMessagesComponent, SnackbarComponent, BottomSheetComponent
  ],
  exports: [
    AlertComponent, ValidationMessagesComponent, LayoutModule, SnackbarComponent, BottomSheetComponent, MainModalModule
  ],
  entryComponents: [SnackbarComponent, BottomSheetComponent, MainModalComponent],
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
