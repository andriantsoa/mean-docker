import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candidat-form',
  templateUrl: './candidat-form.component.html',
  styleUrls: ['./candidat-form.component.scss']
})
export class CandidatFormComponent implements OnInit {

  constructor() { }

  public createCandidatForm(): void {
    this.candidatForm = this.formBuilder.group({
      posteActuel: '',
      presentation: '',
      metier: '',
      status: '',
      disponible: true,
      experiences: this.formBuilder.array([]),
      competences: this.formBuilder.array([]),
      aspirations: this.formBuilder.array([]),
      formations: this.formBuilder.array([]),
    });
  }

  // get aspirations(): FormArray {
  //   return this.candidatForm.get('aspirations') as FormArray;
  // }

}
