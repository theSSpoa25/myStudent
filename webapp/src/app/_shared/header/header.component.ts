import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { userLogout } from 'src/app/store/actions/user.actions';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { getUser } from 'src/app/store/selectors/user.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  private userId!: number;

  constructor(
    private store: Store<UserState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(getUser)).pipe(
      map(user => user.id)
    ).subscribe(
      id => {this.userId = id;}
    )
  }

  public viewUser() {
    this.router.navigate([`/user/${this.userId}/view`]);
  }

  public logout() {
    this.store.dispatch(userLogout());
  }


}
