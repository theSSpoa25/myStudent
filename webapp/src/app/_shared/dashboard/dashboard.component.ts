import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faPlusCircle, faSignOutAlt, faTicketAlt, faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { userLogout } from 'src/app/store/actions/user.actions';
import { UserState } from 'src/app/store/reducers/user.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private userId!: number;

  faHome = faHome;
  faUsers = faUsers;
  faUserPlus = faUserPlus;
  faSignOutAlt = faSignOutAlt;
  faTicketAlt = faTicketAlt;
  faPlusCircle = faPlusCircle;

  constructor(
    private router: Router,
    private store: Store<UserState>
  ) { }

  ngOnInit(): void {
  }

  public viewUser() {
    this.router.navigate([`/user/${this.userId}/view`]);
  }

  public logout() {
    this.store.dispatch(userLogout());
  }

}
