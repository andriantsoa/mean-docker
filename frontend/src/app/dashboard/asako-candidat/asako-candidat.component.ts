import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Secteurs } from 'src/app/commun/constantes/secteur.constant';
import { Role, Statut } from 'src/app/commun/enum/role.enum';
import { ValidationService } from 'src/app/core/components';
import { IProfil } from 'src/app/core/interfaces/profil.interface';
import { ICandidat } from 'src/app/core/interfaces/candidat.interface';
import { CandidatService } from 'src/app/core/services';

@Component({
  selector: 'app-asako-candidat',
  templateUrl: './asako-candidat.component.html',
  styleUrls: ['./asako-candidat.component.css']
})
export class AsakoCandidatComponent implements OnInit {
  public candidat: ICandidat;
  // public step1: FormGroup;
  // public step2: FormGroup;
  // public step3: FormGroup;
  public profil: IProfil;
  public roles: any[];
  public status: any[];
  public secteurs = Secteurs;
  experiencesForm: FormGroup;
  formationsForm: FormGroup;
  competencesForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private candidatService: CandidatService,
    private validationService: ValidationService,
  ) {
    // this.step1 = this.formBuilder.group({
    //   label: new FormControl('', [Validators.required, Validators.minLength(2)]),
    //   role: new FormControl('', [Validators.required]),
    //   status: new FormControl('', [Validators.required, Validators.minLength(2)]),
    // });
    // this.step2 = this.formBuilder.group({
    //   groupe: new FormControl([''], [Validators.minLength(1)]),
    //   secteur: new FormControl([''], [Validators.minLength(1)]),
    // });
    this.roles = this.toArray(Role);
    this.status = this.toArray(Statut);
  }

  ngOnInit(): void {
    this.getCandidat(this.route.snapshot.paramMap.get('id'));
  }

  public getCandidat(id: string): void {
    this.candidatService.getById(id)
      .subscribe(p => {
        this.candidat = p;
        console.log(this.candidat);
      },
        err => console.log(err),
        () => {
          // this.step1.controls.label.setValue(this.candidat.label);
          // this.step1.controls.role.setValue(this.candidat.role);
          // this.step1.controls.status.setValue(this.candidat.status);
          // this.step2.controls.secteur.setValue(this.candidat.secteur);
        });
  }

  private updateCandidat(candidat: ICandidat): void {
    this.candidatService.update(candidat)
      .subscribe(p => {
        console.log(p);
        if (candidat.role === Role.CANDIDAT) {
          this.router.navigate(['/dashboard/candidat']);
        } else if (candidat.role === Role.ENTREPRISE) {
          this.router.navigate(['/dashboard/entreprise']);
        }
      });
  }

  public sendUpdate(): void {
    const param = {
      // _id: this.candidat._id,
      // ...this.step1.value,
      // ...this.step2.value
    } as ICandidat;
    this.updateCandidat(param);
  }


  public createExperiences(): void {
    this.experiencesForm = this.formBuilder.group({
      label: new FormControl('', [Validators.required, Validators.minLength(2)]),
      aspirations: new FormControl([''], [Validators.minLength(1)]),
      status: new FormControl('', [Validators.required, Validators.minLength(2)]),
      groupe: new FormControl([''], [Validators.minLength(1)]),
      secteur: new FormControl([''], [Validators.minLength(1)]),
      entreprise: new FormControl('', [Validators.required, Validators.minLength(2)]),
      competence: new FormControl([''], [Validators.minLength(1)]),
      duree: new FormControl(1),
      debut: new FormControl('', [Validators.required, Validators.minLength(2)]),
      fin: new FormControl(''),
    });
  }

  public createFormations(): void {
    this.formationsForm = this.formBuilder.group({
      titre: new FormControl('', [Validators.required, Validators.minLength(2)]),
      groupe: new FormControl([''], [Validators.minLength(1)]),
      filiere: new FormControl([''], [Validators.minLength(1)]),
      niveau: new FormControl('', [Validators.required, Validators.minLength(2)]),
      etablissement: new FormControl('', [Validators.required, Validators.minLength(2)]),
      debut: new FormControl('', [Validators.required, Validators.minLength(2)]),
      fin: new FormControl(''),
    });
  }

  public createCompetences(): void {
    this.competencesForm = this.formBuilder.group({
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
