import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Statut } from 'src/app/commun/enum/role.enum';
import { defaultInfosEntreprise, IEntreprise, IEntrepriseInfos } from 'src/app/core/interfaces';
import { EntrepriseService } from 'src/app/core/services/entreprise.service';
import { toArray } from '../../shared/outils/array-utils';

@Component({
  selector: 'app-entreprise-form',
  templateUrl: './entreprise-form.component.html',
  styleUrls: ['./entreprise-form.component.scss']
})
export class EntrepriseFormComponent implements OnInit {
  public form1: FormGroup;
  public form2: FormGroup;
  public status: any[];
  @Output() update: EventEmitter<boolean> = new EventEmitter();
  @Input() entreprise: IEntreprise;

  constructor(
    private formBuilder: FormBuilder,
    private entrepriseService: EntrepriseService,
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
      return this.formBuilder.group({ ...defaultValue, ...sourceObject as IEntrepriseInfos });
    }
    (sourceObject[ObjectKey] || []).forEach((value: any) => list.push(this.formBuilder.group({ ...defaultValue, ...value })));
    return this.formBuilder.group({
      [ObjectKey]: this.formBuilder.array(list),
    });
  }

  private buildForms(): void {
    this.form1 = this.createFormulaireFromSourceObject(defaultInfosEntreprise, this.entreprise);
  }

  private updateEntreprise(entreprise: IEntreprise): void {
    this.entrepriseService.update(entreprise)
      .subscribe(p => {
        console.log(p);
      });
  }

  public sendUpdate(): void {
    const param = {
      _id: this.entreprise._id,
      ...this.form1.value
    } as IEntreprise;
    this.updateEntreprise(param);
    this.finish();
  }

  public finish(): void {
    this.update.emit(false);
  }
}
