import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from 'src/app/core/components';
import { ICandidat } from 'src/app/core/interfaces/candidat.interface';
import { CandidatService } from 'src/app/core/services';

@Component({
  selector: 'app-candidat-form',
  templateUrl: './candidat-form.component.html',
  styleUrls: ['./candidat-form.component.scss']
})
export class CandidatFormComponent {
  private _candidat: ICandidat;
  public candidatForm: FormGroup;
  public candidatForm1: FormGroup;
  public candidatForm2: FormGroup;
  public candidatForm3: FormGroup;
  public candidatForm4: FormGroup;

  @Input() set candidat(candidatForm: ICandidat) {
    this._candidat = candidatForm;
    // this.createCandidatForm();
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private candidatService: CandidatService,
    private validationService: ValidationService,
  ) {
    this.createCandidatForm1();
    this.createCandidatForm2();
    this.createCandidatForm3();
    this.createCandidatForm4();
  }

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

  public createCandidatForm1(): void {
    this.candidatForm1 = this.formBuilder.group({
      posteActuel: '',
      presentation: '',
      metier: '',
      status: '',
      disponible: true,
    });
  }

  public createCandidatForm3(): void {
    this.candidatForm3 = this.formBuilder.group({
      experiences: this.formBuilder.array([]),
    });
  }

  public createCandidatForm4(): void {
    this.candidatForm4 = this.formBuilder.group({
      competences: this.formBuilder.array([]),
    });
  }

  public createCandidatForm2(): void {
    this.candidatForm2 = this.formBuilder.group({
      formations: this.formBuilder.array([]),
    });
  }

  private updateCandidat(candidat: ICandidat): void {
    // this.candidatService.update(candidat)
    //   .subscribe(p => {
    //     console.log(p);
    //     if (candidat.role === Role.CANDIDAT) {
    //       this.router.navigate(['/dashboard/candidat']);
    //     } else if (candidat.role === Role.ENTREPRISE) {
    //       this.router.navigate(['/dashboard/entreprise']);
    //     }
    //   });
  }

  public sendUpdate(): void {
    const param = {
      // _id: this.candidat._id,
      // ...this.step1.value,
      // ...this.step2.value
    } as ICandidat;
    this.updateCandidat(param);
  }

  // get aspirations(): FormArray {
  //   return this.candidatForm.get('aspirations') as FormArray;
  // }

}
