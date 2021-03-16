import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { getUser } from 'src/app/store/selectors/user.selectors';
import { TypeResponse } from 'src/app/_models/ticket/type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private token: string = '';

  constructor(
    private http: HttpClient,
    private store: Store<UserState>
  ) {
    this.store.pipe(select(getUser)).pipe(
      map(user => this.token = user.token)
    ).subscribe();
  }

  public getAllStatusses(): Observable<TypeResponse> {
    return this.http.get<TypeResponse>(`${environment.apiEndpoint}/type/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      },
    });
  }
}
