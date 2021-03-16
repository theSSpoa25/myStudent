import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IAppState } from './store/reducers';
import { getUser } from './store/selectors/user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'webapp';
  public user$: any;
  public userIsLogged = false;

  constructor(
    private store: Store<IAppState>
  ) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.user$ = this.store.pipe(select(getUser)).pipe(
      switchMap( user => {
        if (user.token) {
          this.userIsLogged = true;
        }
        return of(user);
      })
    ).subscribe();
  }
}
