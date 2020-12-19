import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { ProfilFormComponent } from './profil-form/profil-form.component'
import { ProfilRoutingModule } from './profil-routing.module';

@NgModule({
  declarations: [ProfilFormComponent],
  imports: [
    CommonModule,
    ProfilRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [ProfilFormComponent]
})
export class ProfilModule { }
