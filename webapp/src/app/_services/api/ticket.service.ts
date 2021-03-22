import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Store, select } from '@ngrx/store';
import { env } from 'process';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { getUser } from 'src/app/store/selectors/user.selectors';
import { Attachment } from 'src/app/_models/attachment/attachment';
import { CreateTicket } from 'src/app/_models/ticket/create-ticket';
import { Status } from 'src/app/_models/ticket/stauts';
import { Ticket } from 'src/app/_models/ticket/ticket';
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

  public getTicket(ticketId: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${environment.apiEndpoint}/ticket/${ticketId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      }
    });
  }

  public changeDescription(ticketId: number, description): Observable<any> {
    return this.http.post<any>(`${environment.apiEndpoint}/ticket/${ticketId}/change-description`, description, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      },
    });
  }

  public changeStatus(ticketId: number, status: Status): Observable<any> {
    return this.http.post<any>(`${environment.apiEndpoint}/ticket/${ticketId}/change-status`, status, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      },
    });
  }

  public changeAssignee(ticketId: number, user): Observable<any> {
    return this.http.post<any>(`${environment.apiEndpoint}/ticket/${ticketId}/change-assignee`, user, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      },
    });
  }

  public changeTitle(ticketId: number, title: string) {
    return this.http.post<any>(`${environment.apiEndpoint}/ticket/${ticketId}/${title}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      },
    });
  }

  public getAllTickets(userId: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${environment.apiEndpoint}/ticket/all/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      }
    });
  }

  public uploadAttachment(userId: number, ticketId: number, file: FormData) {
    return this.http.post(`${environment.apiEndpoint}/attachment/upload/${userId}/${ticketId}`,
    file,
    {
      headers: {
        'Authorization': `${this.token}`,
      },
      observe: 'body'
    }
    )
  }

  public getAllAttachments(ticketId: number): Observable<Attachment[]> {
    return this.http.get<Attachment[]>(`${environment.apiEndpoint}/attachment/all/${ticketId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      }
    })
  }

  public getAttachment(id: number): Observable<Attachment> {
    return this.http.get<Attachment>(`${environment.apiEndpoint}/attachment/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      }
    })
  }
}
