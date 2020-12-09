import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ICandidat } from '../interfaces/candidat.interface';
import { Observable } from 'rxjs';

@Injectable()
export class CandidatService {

  constructor(private http: HttpClient) { }

  public getById(candidatId: string): Observable<ICandidat> {
    return this.http.get<ICandidat>(`${environment.apiEndpoint}/candidat/${candidatId}`).pipe(
      map((candidat: any) => candidat.data)
    );
  }

  public update(candidat: ICandidat): Observable<ICandidat> {
    return this.http.put<ICandidat>(`${environment.apiEndpoint}/candidat/${candidat._id}`, candidat).pipe(
      map((p: any) => p.data)
    );
  }

}
