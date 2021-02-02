import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { String } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { getUser } from 'src/app/store/selectors/user.selectors';
import { User } from 'src/app/_models/user/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: string = '';

  constructor(
    private http: HttpClient,
    private store: Store<UserState>
  ) {
    this.store.pipe(select(getUser)).pipe(
      map(user => this.token = user.token)
    ).subscribe();
  }

  public createUser(user: any) {
    return this.http.post(`${environment.apiEndpoint}/user/create`, user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      },
    })
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiEndpoint}/user/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      },
      observe: 'body'
    })
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiEndpoint}/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      },
      observe: 'body'
    })
  }

  public searchUser(searchQuery: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiEndpoint}/user?${searchQuery}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      },
      observe: 'body'
    })
  }

  public updateUser(id: number | undefined, userUpdate: any): Observable<any> {
    return this.http.post<any>(`${environment.apiEndpoint}/user/update/${id}`, userUpdate, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      },
      observe: 'body'
    })
  }

  public activateUser(id: number): Observable<any> {
    return this.http.put<any>(`${environment.apiEndpoint}/user/activate/${id}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      },
      observe: 'body'
    })
  }

  public deactivate(id: number): Observable<any> {
    return this.http.put<any>(`${environment.apiEndpoint}/user/deactivate/${id}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      },
      observe: 'body'
    })
  }

  public uploadProfilePicture(id: number, file: FormData) {
    return this.http.post(`${environment.apiEndpoint}/profile/upload/${id}`,
    file,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      },
      observe: 'body'
    }
    )
  }
}
