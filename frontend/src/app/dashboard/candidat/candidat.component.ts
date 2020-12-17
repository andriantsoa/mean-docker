import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CandidatService, UserService } from 'src/app/core/services';
import { IProfil, ICandidat, IUser } from 'src/app/core/interfaces';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.scss']
})
export class CandidatComponent implements OnInit {
  public candidat: ICandidat;
  public profil: IProfil;
  public isUpdate = false;
  public connectedUser: IUser;

  constructor(
    private route: ActivatedRoute,
    private candidatService: CandidatService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.connectedUser = this.userService.getCurrentUser();

    /**
     * TODO:
     *  si profil candidat : afficher portfolio avec possiblité de modification profil
     *  si profil entreprise : afficher la liste des demandes de candidature pour mes offres ou et la liste de candidats aux profils recherchés
     */
    if (this.route.snapshot.paramMap.get('id')) {
      this.getCandidat(this.route.snapshot.paramMap.get('id'));
    } else {
      this.getCandidats();
    }
  }

  private getCandidat(id: string): void {
    this.candidatService.getById(id)
      .subscribe(candidat => {
        this.candidat = candidat;
      });
  }

  private getCandidats(): void {
    this.candidatService.getAll()
      .subscribe(candidats => {
        console.log(candidats);
      });
  }
}
