import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IEntreprise } from '../interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class EntrepriseService {

  constructor(private http: HttpClient) { }

  public getById(entrepriseId: string): Observable<IEntreprise> {
    return this.http.get<IEntreprise>(`${environment.apiEndpoint}/entreprise/${entrepriseId}`).pipe(
      map((entreprise: any) => entreprise.data)
    );
  }

  public getAll(): Observable<IEntreprise[]> {
    return this.http.get<IEntreprise[]>(`${environment.apiEndpoint}/entreprises`).pipe(
      map((entreprise: any) => entreprise.data)
    );
  }

  public update(entreprise: IEntreprise): Observable<IEntreprise> {
    return this.http.put<IEntreprise>(`${environment.apiEndpoint}/entreprise/${entreprise._id}`, entreprise).pipe(
      map((p: any) => p.data)
    );
  }

}
