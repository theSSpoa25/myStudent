import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { getUser } from 'src/app/store/selectors/user.selectors';
import { User } from 'src/app/_models/user/User';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html'
})
export class UserViewComponent implements OnInit {

  public user$ = this.store.select(getUser);

  constructor(
    private store: Store<UserState>
  ) { }

  ngOnInit(): void {

  }

}
