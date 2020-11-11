import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { IUser } from '../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(environment.apiEndpoint + '/users').pipe(
      map((users: any) => {
        return users.data;
      })
    );
  }

  public getById(userId: string): Observable<IUser> {
    return this.http.get<IUser>(environment.apiEndpoint + '/user/' + userId).pipe(
      map((user: any) => {
        return user.data;
      })
    );
  }

  public getCurrentUser(): IUser {
    if (localStorage.getItem('currentUser')) {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      return user;
    }
  }

  public setCurrentUser(user: IUser): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public create(user: IUser): Observable<any> {
    return this.http.post(environment.apiEndpoint + '/users', user);
  }

  public update(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(environment.apiEndpoint + '/user/' + user._id, user).pipe(
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
