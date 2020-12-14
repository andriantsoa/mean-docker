import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { defaultFormat } from 'moment';
import { Statut } from 'src/app/commun/enum/role.enum';
import { ValidationService } from 'src/app/core/components';
import { defaultCompetence, defaultExperience, defaultFormation, defaultInfosCandidat, ICandidat, ICandidatInfos, ICompetence, IExperience, IFormation } from 'src/app/core/interfaces/candidat.interface';
import { CandidatService } from 'src/app/core/services';

@Component({
  selector: 'app-candidat-form',
  templateUrl: './candidat-form.component.html',
  styleUrls: ['./candidat-form.component.scss']
})
export class CandidatFormComponent implements OnInit {
  public candidatForm: FormGroup;
  public candidatForm1: FormGroup;
  public candidatForm2: FormGroup;
  public candidatForm3: FormGroup;
  public candidatForm4: FormGroup;
  @Output() update: EventEmitter<boolean> = new EventEmitter();
  @Input() candidat: ICandidat;
  status: any[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private candidatService: CandidatService,
    private validationService: ValidationService,
  ) {
    this.status = this.toArray(Statut);
  }

  ngOnInit(): void {
    this.buildForms();
  }

  public finish(): void {
    this.update.emit(false);
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

  private createFormulaireFromCandidat(defaultValue: any, sourceObject: any, ObjectKey?: string): FormGroup {
    const list = [];
    sourceObject = Object.assign({}, { ...sourceObject });
    if (!ObjectKey) {
      return this.formBuilder.group({ ...defaultValue, ...sourceObject as ICandidatInfos });
    }
    (sourceObject[ObjectKey] || []).forEach((value: any) => list.push(this.formBuilder.group({ ...defaultValue, ...value })));
    return this.formBuilder.group({
      [ObjectKey]: this.formBuilder.array(list),
    });
  }

  private buildForms(): void {
    this.candidatForm1 = this.createFormulaireFromCandidat(defaultInfosCandidat, this.candidat);
    this.candidatForm2 = this.createFormulaireFromCandidat(defaultFormation, this.candidat, 'formations');
    this.candidatForm3 = this.createFormulaireFromCandidat(defaultExperience, this.candidat, 'experiences');
    this.candidatForm4 = this.createFormulaireFromCandidat(defaultCompetence, this.candidat, 'competences');
  }

  private updateCandidat(candidat: ICandidat): void {
    this.candidatService.update(candidat)
      .subscribe(p => {
        console.log(p);
      });
  }

  public sendUpdate(): void {
    const param = {
      _id: this.candidat._id,
      ...this.candidatForm1.value,
      ...this.candidatForm2.value,
      ...this.candidatForm3.value,
      ...this.candidatForm4.value,
    } as ICandidat;
    console.log(param);
    this.updateCandidat(param);
    this.finish();
  }

  public filterNumber(value): boolean {
    return isNaN(Number(value)) === true;
  }

  public toArray(data: any): any[] {
    return Object.keys(data).filter(this.filterNumber).map(key => ({ value: data[key], label: key }));
  }

  // get aspirations(): FormArray {
  //   return this.candidatForm.get('aspirations') as FormArray;
  // }

}
