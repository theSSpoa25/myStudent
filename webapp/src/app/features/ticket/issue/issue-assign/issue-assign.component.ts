import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { id } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { OverlayPanel } from 'primeng/overlaypanel';
import { concat, Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { Ticket } from 'src/app/_models/ticket/ticket';
import { Owner } from 'src/app/_models/user/owner';
import { User } from 'src/app/_models/user/User';
import { TicketService } from 'src/app/_services/api/ticket.service';
import { UserService } from 'src/app/_services/api/user.service';

@Component({
  selector: 'app-issue-assign',
  templateUrl: './issue-assign.component.html',
  styleUrls: ['./issue-assign.component.scss']
})
export class IssueAssignComponent implements OnInit {

  @Input() assignee: Owner;
  @Input() id: number;
  @ViewChild('op') op: OverlayPanel;
  users$: Observable<User[]>;
  userLoading = false;
  userInput$ = new Subject<string>();
  selectedUser: User = null;

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers() {
    this.users$ = concat(
      of([]), // default items
      this.userInput$.pipe(
        distinctUntilChanged(),
        tap(() => (this.userLoading = true)),
        switchMap((term) =>
          this.userService.searchUsersByNameOrSurnameOrRole(term).pipe(
            catchError(() => of([])), // empty list on error
            tap(() => (this.userLoading = false))
          )
        )
      )
    );
  }

  onChange(user: User, op) {
    if(user) {
      // change user
      this.ticketService.changeAssignee(this.id, {id: user.id}).subscribe(
        res => {
          this.toastr.success(`Assignee changed to ${user.name} ${user.surname}`)
          this.assignee.name = user.name;
          this.assignee.surname = user.surname;
          this.selectedUser = null;
          this.op.hide();
        }
      )
    }
  }

  trackByFn(user: User) {
    return user.id;
  }

}
