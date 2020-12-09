import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Statut } from 'src/app/commun/enum/role.enum';
import { ValidationService } from 'src/app/core/components';
import { ICandidat, ICompetence } from 'src/app/core/interfaces/candidat.interface';
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
    if (!this.candidat) {
      this.candidat = {} as ICandidat;
    }
    const candidatInfos = {
      posteActuel: this.candidat.posteActuel || '',
      presentation: this.candidat.presentation || '',
      metier: this.candidat.metier || '',
      status: this.candidat.status || '',
      disponible: this.candidat.disponible || true,
    } as ICandidat;
    this.candidatForm1 = this.formBuilder.group(candidatInfos);
  }

  public createCandidatForm3(): void {
    if (!this.candidat) {
      this.candidat = {} as ICandidat;
    }
    const experiences = this.candidat.experiences || [];
    const list = [];
    experiences.forEach(exp => list.push(this.formBuilder.group(exp)));
    this.candidatForm3 = this.formBuilder.group({
      experiences: this.formBuilder.array(list),
    });
  }

  public createCandidatForm4(): void {
    if (!this.candidat) {
      this.candidat = {} as ICandidat;
    }
    const competences = this.candidat.competences || [];
    const list = [];
    competences.forEach(comp => list.push(this.formBuilder.group(comp)));

    this.candidatForm4 = this.formBuilder.group({
      competences: this.formBuilder.array(list),
    });
  }

  public createCandidatForm2(): void {
    if (!this.candidat) {
      this.candidat = {} as ICandidat;
    }
    const formations = this.candidat.formations || [];
    const list = [];
    formations.forEach(comp => list.push(this.formBuilder.group(comp)));
    this.candidatForm2 = this.formBuilder.group({
      formations: this.formBuilder.array(list),
    });
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
