import { Component } from '@angular/core';
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
  candidatForm: FormGroup;
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
    return this.candidatForm.get('competences') as FormArray;
  }

  public createCompetence(): FormGroup {
    return this.formBuilder.group({
      titre: new FormControl('', [Validators.required, Validators.minLength(2)]),
      niveau: new FormControl('', [Validators.required, Validators.minLength(2)]),
      version: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
  }

  public filterNumber(value): boolean {
    return isNaN(Number(value)) === true;
  }

  public toArray(data: any): any[] {
    return Object.keys(data).filter(this.filterNumber).map(key => ({ value: data[key], label: key }));
  }

}
