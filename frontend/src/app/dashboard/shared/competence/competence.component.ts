import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Secteurs } from 'src/app/commun/constantes/secteur.constant';
import { Role, Statut, Filiere } from 'src/app/commun/enum/role.enum';
import { ICandidat } from 'src/app/core/interfaces/candidat.interface';
import { IProfil } from 'src/app/core/interfaces/profil.interface';

@Component({
  selector: 'app-competence',
  templateUrl: './competence.component.html',
  styleUrls: ['./competence.component.scss']
})
export class CompetenceComponent {
  public parent: FormGroup;
  @Input() set parentForm(parentForm: FormGroup) {
    this.parent = parentForm;
    if (!parentForm || (parentForm && parentForm.value && parentForm.value.competences.length === 0)) {
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

  get competences(): FormArray {
    return this.parent.get('competences') as FormArray;
  }

  public createCompetence(): FormGroup {
    return this.formBuilder.group({
      titre: new FormControl('', [Validators.required, Validators.minLength(2)]),
      niveau: new FormControl('', [Validators.required, Validators.minLength(2)]),
      version: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
  }

  public addNew(): void {
    this.competences.push(this.createCompetence());
  }

  public remove(i: number): void {
    if (this.competences && this.competences.length > 1) {
      this.competences.removeAt(i);
    }
  }

  public filterNumber(value): boolean {
    return isNaN(Number(value)) === true;
  }

  public toArray(data: any): any[] {
    return Object.keys(data).filter(this.filterNumber).map(key => ({ value: data[key], label: key }));
  }

}
