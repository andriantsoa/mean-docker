import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CandidatService, UserService } from 'src/app/core/services';
import { IProfil } from 'src/app/core/interfaces/profil.interface';
import { ICandidat } from 'src/app/core/interfaces/candidat.interface';
import { IUser } from 'src/app/core/interfaces/user.interface';

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
    this.getCandidat(this.route.snapshot.paramMap.get('id'));
  }

  public getCandidat(id: string): void {
    this.candidatService.getById(id)
      .subscribe(candidat => {
        this.candidat = candidat;
      });
  }
}
