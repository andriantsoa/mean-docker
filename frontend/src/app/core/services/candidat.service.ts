import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { filter, map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ICandidat, IDocument } from '../interfaces';
import { Observable, pipe } from 'rxjs';

@Injectable()
export class CandidatService {
  percentDone: number;

  constructor(private http: HttpClient) { }

  public getById(candidatId: string): Observable<ICandidat> {
    return this.http.get<ICandidat>(`${environment.apiEndpoint}/candidat/${candidatId}`).pipe(
      map((candidat: any) => candidat.data)
    );
  }

  public getAll(): Observable<ICandidat[]> {
    return this.http.get<ICandidat[]>(`${environment.apiEndpoint}/candidats`).pipe(
      map((candidat: any) => candidat.data)
    );
  }

  public update(candidat: ICandidat): Observable<ICandidat> {
    return this.http.put<ICandidat>(`${environment.apiEndpoint}/candidat/${candidat._id}`, candidat).pipe(
      map((p: any) => p.data)
    );
  }

  public addDocument(candidatId: String, document: IDocument, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('imageTitle', document.imageTitle);
    formData.append('imageDesc', document.imageDesc);
    return this.http.post<any>(`${environment.apiEndpoint}/candidat/${candidatId}/documents`, formData).pipe(
      map((p: any) => p.data)
    );
  }

  public uploadFileForCandidat(formValue: any, candidatId: string): Observable<any> {

    return this.http.post(`${environment.apiEndpoint}/candidat/${candidatId}/documents`, this.toFormData(formValue.image), {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      this.uploadProgress(progress => (this.percentDone = progress)),
      this.toResponseBody()
    );
  }

  private toFormData<T>(formValue: T) {
    console.log(formValue);

    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }

    console.log(formData);

    return formData;
  }

  private toResponseBody<T>() {
    return pipe(
      filter((event: HttpEvent<T>) => event.type === HttpEventType.Response),
      map((res: HttpResponse<T>) => res.body)
    );
  }

  private uploadProgress<T>(cb: (progress: number) => void) {
    return tap((event: HttpEvent<T>) => {
      if (event.type === HttpEventType.UploadProgress) {
        cb(Math.round((100 * event.loaded) / event.total));
      }
    });
  }

  public upload(data, candidatId): Observable<any> {
    const uploadURL = `${environment.apiEndpoint}/candidat/${candidatId}/file`;

    return this.http.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events'
    })
      // .pipe(map((event) => {

      //   switch (event.type) {
      //     case HttpEventType.UploadProgress:
      //       const progress = Math.round(100 * event.loaded / event.total);
      //       return { status: 'progress', message: progress };

      //     case HttpEventType.Response:
      //       return event.body;

      //     default:
      //       return `Unhandled event: ${event.type}`;
      //   }
      // })
      // )
      ;
  }

}
