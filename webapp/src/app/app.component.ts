import { Route } from '@angular/compiler/src/core';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter } from 'lodash';
import { of, Subscription } from 'rxjs';
import {mergeMap, switchMap} from 'rxjs/operators';
import { IAppState } from './store/reducers';
import { getUser } from './store/selectors/user.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  private _title = 'webapp';


  public user$: any;
  public userIsLogged = false;

  constructor(
    private store: Store<IAppState>,
    private router: Router
  ) {
   this.user$ = this.store.pipe(select(getUser)).pipe(
      switchMap( user => {
        if (user.token) {
          this.userIsLogged = true;
        }
        return of(user);
      })
    ).subscribe();
  }

  this.user$ = this.store.pipe(
    mergeMap(;es => pfoifplkffjqeofeplfqkef[qklfkpqwfpqwkef;lwqefk q;wdf ;qdkfj qpkf lq eofi[1pi4 pekfqjwf[ iweklfkq [pjwfpqwej=1ir43 je1[p1fejr4rj4 poi3kflj 1wef 3f
43 fo43
[ 34





  ]]]]]])
  )

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.title = 'test';
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
