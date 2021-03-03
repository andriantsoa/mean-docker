import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CategorieDoc } from 'src/app/commun/enum/doc-categorie.enum';
import { ICandidat, uploadResponse } from 'src/app/core/interfaces';
import { CandidatService } from 'src/app/core/services';
import { toArray } from '../../outils/array-utils';

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss']
})
export class DocumentFormComponent implements OnInit {
  public fileAttr = 'choisir un fichier';
  public documentForm: FormGroup;
  public status: any[];
  public categories: any[];
  @ViewChild('fileInput') fileInput: ElementRef;
  @Output() update: EventEmitter<boolean> = new EventEmitter();
  @Input() candidat: ICandidat;
  public progress: number;
  public uploadResponse: uploadResponse = { status: '', message: '', filePath: '' };
  public error: string;

  constructor(
    private formBuilder: FormBuilder,
    private candidatService: CandidatService,
    public snackBar: MatSnackBar, public dialog: MatDialog
  ) {
    this.categories = toArray(CategorieDoc);
  }

  ngOnInit(): void {
    this.documentForm = this.formBuilder.group({
      // imageFile: [null, Validators.required],
      title: [null, Validators.required],
      categorie: [CategorieDoc.CV, Validators.required],
      file: [''],
      // image: [null, Validators.required]
    });
  }

  // public onFileChange(event): void {

  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.documentForm.patchValue({
  //       fileSource: file
  //     });
  //   }
  // }

  public finish(): void {
    this.update.emit(false);
  }

  // private addDocument(document: IDocument, file: File): void {
  //   this.candidatService.addDocument(this.candidat._id, document, file)
  //     .subscribe(p => {
  //       console.log(p);
  //     });
  // }

  // public sendUpdate(): void {
  //   const doc = this.documentForm.value;
  //   const file = new File([], 'testName');
  //   this.addDocument(doc, file);
  //   this.finish();
  // }

  // public uploadFileEvt(imgFile: any) {
  //   if (imgFile.target.files && imgFile.target.files[0]) {
  //     this.fileAttr = '';
  //     Array.from(imgFile.target.files).forEach((file: File) => {
  //       this.fileAttr += `${file.name}-`;
  //     });
  //     this.documentForm.get('fileAttr').setValue(this.fileAttr);

  //     // HTML5 FileReader API
  //     let reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       let image = new Image();
  //       image.src = e.target.result;
  //       image.onload = rs => {
  //         let imgBase64Path = e.target.result;
  //       };
  //     };
  //     reader.readAsDataURL(imgFile.target.files[0]);

  //     // Reset if duplicate image uploaded again
  //     this.fileInput.nativeElement.value = '';
  //   } else {
  //     this.fileAttr = 'choisir un fichier';
  //     this.documentForm.get('fileAttr').setValue(this.fileAttr);
  //   }
  // }

  // public submitFile(): any {
  //   this.candidatService.uploadFileForCandidat(this.documentForm.value, this.candidat._id)
  //     .subscribe(event => {
  //       this.progress = 0;
  //       this.documentForm.reset();
  //       if (event.type === HttpEventType.UploadProgress) {
  //         this.progress = Math.round((100 * event.loaded) / event.total);
  //       }

  //       if (event.type === HttpEventType.Response) {
  //         this.progress = 0;
  //         this.documentForm.reset();
  //       }
  //     });
  // }

  // OK OK 

  public onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      console.log('file', event);

      const file = (event.target as HTMLInputElement).files[0];
      this.documentForm.patchValue({
        file
      });
      this.documentForm.get('file').updateValueAndValidity()
    }
  }

  public onSubmit() {
    const formData = new FormData();
    formData.append("name", this.documentForm.get('title').value);
    formData.append("data", this.documentForm.get('file').value);

    this.candidatService.upload(formData, this.candidat._id)
      .subscribe(
        (res) => {
          console.log(res);
          this.uploadResponse = res;
        },
        (err) => this.error = err
      );
  }

}
