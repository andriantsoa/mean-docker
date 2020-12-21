import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BandeauComponent } from './bandeau.component';

@NgModule({
  declarations: [BandeauComponent],
  imports: [
    CommonModule
  ],
  exports: [BandeauComponent]
})
export class BandeauModule { }
