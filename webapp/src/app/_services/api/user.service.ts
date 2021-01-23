import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { getUser } from 'src/app/store/selectors/user.selectors';
import { User } from 'src/app/_models/user/User';
import { environment } from 'src/environments/environment';

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
}
