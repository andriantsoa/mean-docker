import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(environment.apiEndpoint + '/users').pipe(
      map((users: any) => {
        return users.data;
      })
    );
  }

  public getById(userId: string): Observable<User> {
    return this.http.get<User>(environment.apiEndpoint + '/user/' + userId).pipe(
      map((user: any) => {
        return user.data;
      })
    );
  }

  public getCurrentUser(): User {
    if (localStorage.getItem('currentUser')) {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      return user;
    }
  }

  public create(user: User): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/users', user);
  }

  public update(user: User): Observable<User> {
    return this.http.put<User>(environment.apiEndpoint + '/user/' + user._id, user).pipe(
      map((u: any) => {
        return u.data;
      })
    );
  }

  public changePassword(id: string, password: any): Observable<any> {
    return this.http.put(environment.apiEndpoint + '/user/changepassword/' + id, { password }).pipe(map((res: any) => res.data));
  }

  public delete(userId: string): Observable<any> {
    return this.http.delete(environment.apiEndpoint + '/user/' + userId);
  }

  public validate(param: any): Observable<any> {
    console.log(param);

    return this.http.post(environment.apiEndpoint + `/user/validation`, param);
  }
}
