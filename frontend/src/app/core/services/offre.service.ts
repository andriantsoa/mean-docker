import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IEntreprise, IOffre } from '../interfaces';
import { Observable } from 'rxjs';
import { IJobOffer } from 'src/app/commun/interfaces/job-offer.interface';

@Injectable()
export class OffreService {

  constructor(private http: HttpClient) { }

  public getById(offreId: string): Observable<IOffre> {
    return this.http.get<IOffre>(`${environment.apiEndpoint}/offre/${offreId}`).pipe(
      map((entreprise: any) => entreprise.data)
    );
  }

  public getFullById(entrepriseId: string, offreId: string): Observable<IOffre> {
    return this.http.get<IOffre>(`${environment.apiEndpoint}/entreprise/${entrepriseId}/offre/${offreId}`).pipe(
      map((entreprise: any) => entreprise.data)
    );
  }

  public getAllOffresEntreprise(entrepriseId: string): Observable<IOffre[]> {
    return this.http.get<IOffre[]>(`${environment.apiEndpoint}/entreprise/${entrepriseId}/offres`).pipe(
      map((entreprise: any) => entreprise.data)
    );
  }

  public getAll(): Observable<IOffre[]> {
    return this.http.get<IOffre[]>(`${environment.apiEndpoint}/offres`).pipe(
      map((entreprise: any) => entreprise.data)
    );
  }

  public getPublicOffers(filters: any): Observable<IJobOffer[]> {
    return this.http.get<IOffre[]>(`${environment.apiEndpoint}/offres/public`).pipe(
      map((list: any) => {
        return list.data.map(offre => {
          const jobOffer = {
            titreOffre: offre.titreOffre,
            entreprise: offre.entreprise,
            date: offre.createdAt,
            domaine: offre?.entreprise?.mission || 'Sans Domaine', // ??
            city: offre.city,
            avantages: offre.avantages,
            description: offre.description,
            competences: offre.competences,
            formations: offre.formations,
            salaire: offre.salaire,
            status: offre.status,
            contact: {
              label: 'Sale Manager',
              email: 'test.test@test.test'
            },
            online: offre.online
          } as IJobOffer;
          return jobOffer;
          // Vrai retour à utiliser pour les offres sinon mettre à jour IJobOffer 
          // {
          //   titreOffre: "TESTER",
          //   avantages: ["tickets restaurent", "transports"],
          //   city: "Antananarivo",
          //   codeOffre: "1608573568157",
          //   competences: [{ titre: "Test qualité", niveau: 2, version: "" }, …],
          //   createdAt: "2020-12-21T18:26:58.645Z",
          //   dateDebut: "12/01/2021",
          //   dateLimit: "12/01/2021",
          //   description: "Travail de test sur des projets innovants",
          //   duree: "12 mois",
          //   formations: [{ filiere: ["informatique"], titre: "Master en informatique", niveau: "Licence", … }],
          //   listeCandidats: [],
          //   online: true,
          //   salaire: 1000000,
          //   status: 2,
          //   updatedAt: "2020-12-25T23:08:49.109Z",
          //   __v: 0,
          //   _id: "5fe0e8f27352ea43745eb855",
          // };
        });
        // return list.data;
      })
    );
  }

  public update(entrepriseId: string, offreId: string, offre: IOffre): Observable<IOffre> {
    return this.http.put<IOffre>(`${environment.apiEndpoint}/entreprise/${entrepriseId}/offre/${offreId}`, offre).pipe(
      map((p: any) => p.data)
    );
  }

  public new(entrepriseId: string, offre: IOffre): Observable<IOffre> {
    return this.http.post<IOffre>(`${environment.apiEndpoint}/entreprise/${entrepriseId}/offre`, offre).pipe(
      map((p: any) => p.data)
    );
  }

}
