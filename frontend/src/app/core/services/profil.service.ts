import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IProfil } from '../interfaces/profil.interface';
import { Observable } from 'rxjs';

@Injectable()
export class ProfilService {

  constructor(private http: HttpClient) { }

  public getById(profilId: string): Observable<IProfil> {
    return this.http.get<IProfil>(`${environment.apiEndpoint}/profil/${profilId}`).pipe(
      map((profil: any) => profil.data)
    );
  }

  public update(profil: IProfil): Observable<IProfil> {
    return this.http.put<IProfil>(`${environment.apiEndpoint}/profil/${profil._id}`, profil).pipe(
      map((p: any) => p.data)
    );
  }

}
