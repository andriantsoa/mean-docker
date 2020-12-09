import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Secteurs } from 'src/app/commun/constantes/secteur.constant';
import { Role, Statut, Filiere } from 'src/app/commun/enum/role.enum';
import { ICandidat } from 'src/app/core/interfaces/candidat.interface';
import { IProfil } from 'src/app/core/interfaces/profil.interface';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.scss']
})
export class FormationComponent {
  public parent: FormGroup;
  @Input() set parentForm(parentForm: FormGroup) {
    this.parent = parentForm;
    this.addNew();
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

  get formations(): FormArray {
    return this.parent.get('formations') as FormArray;
  }

  public createFormation(): FormGroup {
    return this.formBuilder.group({
      titre: new FormControl('', [Validators.required, Validators.minLength(2)]),
      groupe: new FormControl([''], [Validators.minLength(1)]),
      filiere: new FormControl([''], [Validators.minLength(1)]),
      niveau: new FormControl('', [Validators.required, Validators.minLength(2)]),
      etablissement: new FormControl('', [Validators.required, Validators.minLength(2)]),
      debut: new FormControl('', [Validators.required, Validators.minLength(2)]),
      fin: new FormControl(''),
    });
  }

  public addNew(): void {
    this.formations.push(this.createFormation());
  }

  public removeExperience(i: number): void {
    if (this.formations && this.formations.length > 1) {
      this.formations.removeAt(i);
    }
  }

  public filterNumber(value): boolean {
    return isNaN(Number(value)) === true;
  }

  public toArray(data: any): any[] {
    return Object.keys(data).filter(this.filterNumber).map(key => ({ value: data[key], label: key }));
  }
}
