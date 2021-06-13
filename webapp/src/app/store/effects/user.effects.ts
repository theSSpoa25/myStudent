import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as UserActions from '../actions/user.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private router: Router) {}

  userLogout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.userLogout),
        tap((action) => {
          this.router.navigate(['/login']);
        })
      );
    },
    { dispatch: false }
  );
}


import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-favorite-color',
  template: `
    Favorite Color: <input type="text" [formControl]="favoriteColorControl">
  `
})
export class FavoriteColorComponent {
  favoriteColorControl = new FormControl('');
}
