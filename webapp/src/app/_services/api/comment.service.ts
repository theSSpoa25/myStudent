import { HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { getUser } from 'src/app/store/selectors/user.selectors';
import { Comment } from 'src/app/_models/comment/comment';
import { CreateComment } from 'src/app/_models/comment/create-comment';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private token: string = '';

  constructor(
    private http: HttpClient,
    private store: Store<UserState>
  ) {
    this.store.pipe(select(getUser)).pipe(
      map(user => this.token = user.token)
    ).subscribe();
  }

  public createComment(createComment: CreateComment): Observable<HttpResponseBase> {
    return this.http.post<HttpResponseBase>(`${environment.apiEndpoint}/comment/create`, createComment, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      },
    })
  }

  public getAllComments(ticketId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${environment.apiEndpoint}/comment/all/ticket/${ticketId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${this.token}`,
      },
    })
  }
}
