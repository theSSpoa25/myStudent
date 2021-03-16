import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { getUser } from 'src/app/store/selectors/user.selectors';
import { CreateTicket } from 'src/app/_models/ticket/create-ticket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private token: string = '';

  constructor(
    private http: HttpClient,
    private store: Store<UserState>
  ) {
    this.store.pipe(select(getUser)).pipe(
      map(user => this.token = user.token)
    ).subscribe();
  }

  public createTicket(createTicketDto: CreateTicket): Observable<number> {
    return this.http.post<number>(`${environment.apiEndpoint}/ticket/create`, createTicketDto, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      },
    })
  }
}
