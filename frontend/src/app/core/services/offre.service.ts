import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { IOffre } from '../interfaces';
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
    const url = `${environment.apiEndpoint}/offres/public?
      limit=${filters.limit || 10}
      &what=${filters.what}
      &where=${filters.where}`;
    return this.http.get<IOffre[]>(url).pipe(
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
        });
      })
    );
  }

  public getPremiumOffers(filters: any): Observable<IJobOffer[]> {
    const url = `${environment.apiEndpoint}/offres/premium?
      limit=${filters.limit || 10}`;
    return this.http.get<IOffre[]>(url).pipe(
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
        });
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
