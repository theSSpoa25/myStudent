import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { User } from '../_models/user/User';
import { UserState } from '../store/reducers/user.reducer';
import { ThrowStmt } from '@angular/compiler';
import { userLogout } from '../store/actions/user.actions';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<UserState>
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if(error && error.status === 401) {
          this.store.dispatch(userLogout());
        }
        return of(error);
      })
    );
  }
}
