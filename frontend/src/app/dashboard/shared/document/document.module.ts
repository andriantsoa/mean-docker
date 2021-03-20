import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentFormComponent } from './document-form/document-form.component';
import { MaterialModule } from 'src/app/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadFileComponent } from './upload-file/upload-file.component';

@NgModule({
  declarations: [
    DocumentFormComponent,
    UploadFileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    DocumentFormComponent,
    UploadFileComponent
  ]
})
export class DocumentModule { }
