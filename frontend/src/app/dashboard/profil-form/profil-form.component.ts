import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Role, Statut } from 'src/app/commun/enum/role.enum';
import { ValidationService } from 'src/app/core/components';
import { ProfilService, UserService } from 'src/app/core/services';
import { IProfil } from '../../core/interfaces/profil.interface';

@Component({
  selector: 'app-profil-form',
  templateUrl: './profil-form.component.html',
  styleUrls: ['./profil-form.component.scss']
})
export class ProfilFormComponent implements OnInit {
  public step1: FormGroup;
  public step2: FormGroup;
  public step3: FormGroup;
  public profil: IProfil;
  public roles: any[];
  public status: any[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private profilService: ProfilService,
    private validationService: ValidationService,
  ) {
    this.step1 = this.formBuilder.group({
      label: new FormControl('', [Validators.required, Validators.minLength(2)]),
      role: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
    this.step2 = this.formBuilder.group({
      groupe: new FormControl([''], [Validators.minLength(1)]),
      secteur: new FormControl([''], [Validators.minLength(1)]),
    });
    this.roles = this.toArray(Role);
    this.status = this.toArray(Statut);
  }

  ngOnInit(): void {
    this.getProfil(this.route.snapshot.paramMap.get('id'));
  }

  public getProfil(id: string): void {
    this.profilService.getById(id)
      .subscribe(p => {
        this.profil = p;
        console.log(this.profil);
      },
        err => console.log(err),
        () => {
          this.step1.controls.label.setValue(this.profil.label);
          this.step1.controls.role.setValue(this.profil.role);
          this.step1.controls.status.setValue(this.profil.status);
        });
  }

  // public createExperiences(): void {
  //   this.profilForm = this.formBuilder.group({
  //     label: new FormControl('', [Validators.required, Validators.minLength(2)]),
  //     aspirations: new FormControl([''], [Validators.minLength(1)]),
  //     status: new FormControl('', [Validators.required, Validators.minLength(2)]),
  //     groupe: new FormControl([''], [Validators.minLength(1)]),
  //     secteur: new FormControl([''], [Validators.minLength(1)]),
  //   });
  // }

  public filterNumber(value): boolean {
    return isNaN(Number(value)) === true;
  }

  public toArray(data: any): any[] {
    return Object.keys(data).filter(this.filterNumber).map(key => ({ value: data[key], label: key }));
  }

}
