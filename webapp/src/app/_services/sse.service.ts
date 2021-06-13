import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserState } from '../store/reducers/user.reducer';
import { getUser } from '../store/selectors/user.selectors';
import {  EventSourcePolyfill } from 'event-source-polyfill';
import { TicketStats } from '../_models/ticket/ticket-stats';

@Injectable({
  providedIn: 'root'
})
export class SseService {
  private token: string = '';

  constructor(
    private http: HttpClient,
    private store: Store<UserState>,
    private zone: NgZone
  ) {
    this.store.pipe(select(getUser)).pipe(
      map(user => this.token = user.token)
    ).subscribe();
  }

  getTeamsStream(): Observable<TicketStats> {
    return new Observable((observer) => {
      let eventSource = new EventSourcePolyfill(`${environment.apiEndpoint}/dashboard/stream-flux`, {
        headers: {
          'Authorization': `${this.token}`
        }
      });

      eventSource.onmessage = (event) => {
          const stats: TicketStats = JSON.parse(event.data);

          if (stats) {
            this.zone.run(() => observer.next(stats));
          }
      };

      eventSource.onerror = (error) => {
        if (eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
      }
    });
  }
}
