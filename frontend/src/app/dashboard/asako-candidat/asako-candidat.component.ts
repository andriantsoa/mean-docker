import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Secteurs } from 'src/app/commun/constantes/secteur.constant';
import { Filiere, Role, Statut } from 'src/app/commun/enum/role.enum';
import { ValidationService } from 'src/app/core/components';
import { IProfil } from 'src/app/core/interfaces/profil.interface';
import { ICandidat } from 'src/app/core/interfaces/candidat.interface';
import { CandidatService } from 'src/app/core/services';

@Component({
  selector: 'app-asako-candidat',
  templateUrl: './asako-candidat.component.html',
  styleUrls: ['./asako-candidat.component.scss']
})
export class AsakoCandidatComponent implements OnInit {
  public candidat: ICandidat;
  public profil: IProfil;
  public roles: any[];
  public status: any[];
  public secteurs = Secteurs;
  experiencesForm: FormGroup;
  experience: FormGroup;
  formationsForm: FormGroup;
  formation: FormGroup;
  competencesForm: FormGroup;
  competence: FormGroup;
  filieres: any[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private candidatService: CandidatService,
    private validationService: ValidationService,
  ) {
    this.roles = this.toArray(Role);
    this.status = this.toArray(Statut);
    this.filieres = this.toArray(Filiere);
  }

  ngOnInit(): void {
    this.getCandidat(this.route.snapshot.paramMap.get('id'));
  }

  public getCandidat(id: string): void {
    this.candidatService.getById(id)
      .subscribe(candidat => {
        this.candidat = candidat;
      });
  }

  public filterNumber(value): boolean {
    return isNaN(Number(value)) === true;
  }

  public toArray(data: any): any[] {
    return Object.keys(data).filter(this.filterNumber).map(key => ({ value: data[key], label: key }));
  }

}
