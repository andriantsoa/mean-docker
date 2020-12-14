import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Secteurs } from 'src/app/commun/constantes/secteur.constant';
import { Role, Statut, Filiere } from 'src/app/commun/enum/role.enum';
import { ICandidat } from 'src/app/core/interfaces/candidat.interface';
import { IProfil } from 'src/app/core/interfaces/profil.interface';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent {
  public parent: FormGroup;
  @Input() set parentForm(parentForm: FormGroup) {
    this.parent = parentForm;
    if (!parentForm || (parentForm && parentForm.value && parentForm.value.experiences.length === 0)) {
      this.addNew();
    }
  }
  public candidat: ICandidat;
  public profil: IProfil;
  public roles: any[];
  public status: any[];
  public filieres: any[];
  public secteurs = Secteurs;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) {
    this.roles = this.toArray(Role);
    this.status = this.toArray(Statut);
    this.filieres = this.toArray(Filiere);
  }

  get experiences(): FormArray {
    return this.parent.get('experiences') as FormArray;
  }

  public createExperience(): FormGroup {
    return this.formBuilder.group({
      label: new FormControl('', [Validators.required, Validators.minLength(2)]),
      aspirations: new FormControl(['']),
      status: new FormControl('', [Validators.required, Validators.minLength(2)]),
      secteur: new FormControl([''], [Validators.minLength(1)]),
      entreprise: new FormControl('', [Validators.required, Validators.minLength(2)]),
      details: new FormControl('', [Validators.required, Validators.minLength(2)]),
      competence: new FormControl([''], [Validators.minLength(1)]),
      duree: new FormControl(1),
      debut: new FormControl('', [Validators.required, Validators.minLength(2)]),
      fin: new FormControl(''),
    });
  }

  public addNew(): void {
    this.experiences.push(this.createExperience());
  }

  public remove(i: number): void {
    this.experiences.removeAt(i);
  }

  public filterNumber(value): boolean {
    return isNaN(Number(value)) === true;
  }

  public toArray(data: any): any[] {
    return Object.keys(data).filter(this.filterNumber).map(key => ({ value: data[key], label: key }));
  }
}
