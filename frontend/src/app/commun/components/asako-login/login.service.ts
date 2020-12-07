import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(environment.apiEndpoint + '/user/authenticate', { username, password })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.data && user.data.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if (typeof window !== 'undefined') {
              localStorage.setItem('currentUser', JSON.stringify(user.data));
            }
          }
          return user.data;
        })
      );
  }

  public logout(): void {
    // remove user from local storage to log user out
    if (typeof window !== 'undefined') {
      localStorage.removeItem('currentUser');
    }
  }
}
