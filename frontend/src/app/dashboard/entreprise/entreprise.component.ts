import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEntreprise } from 'src/app/core/interfaces';
import { EntrepriseService } from 'src/app/core/services';

@Component({
  selector: 'app-entreprise',
  templateUrl: './entreprise.component.html',
  styleUrls: ['./entreprise.component.scss']
})
export class EntrepriseComponent implements OnInit {
  public entreprise: IEntreprise;
  public isUpdate = false;
  public isOffreCreation = false;

  constructor(
    private route: ActivatedRoute,
    private entrepriseService: EntrepriseService,
  ) { }

  /**
   * TODO:
   *  si profil entreprise : afficher portfolio avec possiblité de modification profil
   *  si profil candidat : afficher la liste des offres d'entreprise que j'ai effectuées ou et la liste de entreprise aux offres du profil candidat
   */
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id')) {
      this.getEntreprise(this.route.snapshot.paramMap.get('id'));
    } else {
      this.getEntreprises();
    }
  }

  private getEntreprise(id: string): void {
    this.entrepriseService.getById(id)
      .subscribe(entreprise => {
        this.entreprise = entreprise;
      });
  }

  private getEntreprises(): void {
    this.entrepriseService.getAll()
      .subscribe(enterprises => {
        console.log(enterprises);
      });
  }

  public addOffre() {
    this.isOffreCreation = true;
  }
}
