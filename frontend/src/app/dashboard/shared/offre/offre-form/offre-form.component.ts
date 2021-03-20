import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Statut } from 'src/app/commun/enum/role.enum';
import { defaultInfosOffre, IEntreprise, IOffre, IOffreInfos } from 'src/app/core/interfaces';
import { OffreService } from 'src/app/core/services';
import { toArray, pick } from '../../outils/array-utils';
@Component({
  selector: 'app-offre-form',
  templateUrl: './offre-form.component.html',
  styleUrls: ['./offre-form.component.scss']
})
export class OffreFormComponent implements OnInit {
  public form1: FormGroup;
  public form2: FormGroup;
  public form3: FormGroup;
  public status: any[];
  @Output() update: EventEmitter<boolean> = new EventEmitter();
  @Input() offre: IOffre;
  @Input() entreprise: IEntreprise;

  constructor(
    private formBuilder: FormBuilder,
    private offreService: OffreService,
  ) {
    this.status = toArray(Statut);
  }

  ngOnInit(): void {
    this.buildForms();
  }

  private createFormulaireFromSourceObject(defaultValue: any, sourceObject: any, ObjectKey?: string): FormGroup {
    const list = [];
    sourceObject = Object.assign({}, { ...sourceObject });
    if (!ObjectKey) {
      const keys = [
        'codeOffre', 'description', 'titreOffre', 'status', 'online', 'city', 'salaire', 'duree', 'dateDebut', 'dateLimit'
      ];
      return this.formBuilder.group({ ...defaultValue, ...pick(sourceObject, keys) as IOffreInfos });
    }
    (sourceObject[ObjectKey] || []).forEach((value: any) => list.push(this.formBuilder.group({ ...defaultValue, ...value })));
    return this.formBuilder.group({
      [ObjectKey]: this.formBuilder.array(list),
    });
  }

  private buildForms(): void {
    this.form1 = this.createFormulaireFromSourceObject(defaultInfosOffre, this.offre);
    this.form2 = this.createFormulaireFromSourceObject(defaultInfosOffre, this.offre, 'competences');
    this.form3 = this.createFormulaireFromSourceObject(defaultInfosOffre, this.offre, 'formations');
  }

  private updateOffre(offre: IOffre): void {
    const entrepriseId = this.entreprise._id;
    this.offreService.update(entrepriseId, this.offre._id, offre)
      .subscribe(p => {
        console.log(p);
      });
  }

  private newOffre(entrepriseId: string, offre: IOffre): void {
    this.offreService.new(entrepriseId, offre)
      .subscribe(p => {
        console.log(p);
      });
  }

  public sendCreation(): void {
    const param = {
      ...this.form1.value,
      ...this.form2.value,
      ...this.form3.value
    } as IOffre;
    this.newOffre(this.entreprise._id, param);
  }

  public sendUpdate(): void {
    const param = {
      _id: this.offre._id,
      ...this.form1.value,
      ...this.form2.value,
      ...this.form3.value
    } as IOffre;
    this.updateOffre(param);
  }

  public sendOffre() {
    if (this.offre?._id) {
      this.sendUpdate();
    } else {
      this.sendCreation();
    }
    this.finish();
  }

  public finish(): void {
    this.update.emit(false);
  }

}
