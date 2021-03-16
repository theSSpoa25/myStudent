import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { getUser } from 'src/app/store/selectors/user.selectors';
import { StatusResponse } from 'src/app/_models/ticket/stauts';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private token: string = '';

  constructor(
    private http: HttpClient,
    private store: Store<UserState>
  ) {
    this.store.pipe(select(getUser)).pipe(
      map(user => this.token = user.token)
    ).subscribe();
  }

  public getAllStatusses(): Observable<StatusResponse> {
    return this.http.get<StatusResponse>(`${environment.apiEndpoint}/status/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      },
    });
  }
}
