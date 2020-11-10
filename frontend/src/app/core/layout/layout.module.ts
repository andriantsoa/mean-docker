import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommunModule } from './../../commun/commun.module';

const components = [
  LayoutComponent, HeaderComponent, FooterComponent, SidebarComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    RouterModule, CommonModule,
    CommunModule
  ],
  exports: [
    ...components
  ],
  providers: []
})
export class LayoutModule {
  static forRoot(): ModuleWithProviders<LayoutModule> {
    return {
      ngModule: LayoutModule,
      providers: []
    };
  }
}
