import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IOffre } from '../interfaces';
import { Observable } from 'rxjs';

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
