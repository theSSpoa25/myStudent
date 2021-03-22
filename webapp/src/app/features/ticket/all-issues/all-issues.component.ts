import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faIcons } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { getUser } from 'src/app/store/selectors/user.selectors';
import { Ticket } from 'src/app/_models/ticket/ticket';
import { TicketService } from 'src/app/_services/api/ticket.service';

@Component({
  selector: 'app-all-issues',
  templateUrl: './all-issues.component.html',
  styleUrls: ['./all-issues.component.scss']
})
export class AllIssuesComponent implements OnInit {

  private userId: number;
  public tickets: Ticket[];
  public loading: boolean = true;
  public faEye = faEye;

  constructor(
    private ticketService: TicketService,
    private store: Store<UserState>,
    private router: Router
  ) {
    this.store.pipe(select(getUser)).pipe(
      map(user => user.id),
      mergeMap(userId => {
        console.log(userId)
        return this.ticketService.getAllTickets(userId)
      })
    ).subscribe(res => {
      this.tickets = res;
      this.loading = false;
    })
  }

  ngOnInit(): void {

  }

  goTo(id) {
    this.router.navigate([`ticket/${id}`]);
  }

}
