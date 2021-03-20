import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toNumber } from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { Ticket } from 'src/app/_models/ticket/ticket';
import { TicketService } from 'src/app/_services/api/ticket.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html'
})
export class IssueComponent implements OnInit {
  id: number;
  ticket$: Observable<Ticket>;

  constructor(
    private activateRoute: ActivatedRoute,
    private ticketService: TicketService
  ) {
    if (this.activateRoute.snapshot.paramMap.get('id')) {
      this.id = toNumber(this.activateRoute.snapshot.paramMap.get('id'));
    }
  }

  ngOnInit(): void {
    this.ticket$ = this.ticketService.getTicket(this.id);
  }

}
