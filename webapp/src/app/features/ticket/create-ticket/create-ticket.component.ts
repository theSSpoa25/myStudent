import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { concat, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  switchMap,
  tap
} from 'rxjs/operators';
import { PushTokenState } from 'src/app/store/reducers/push-token.reducer';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { getPushToken } from 'src/app/store/selectors/push-token.selectors';
import { getUser } from 'src/app/store/selectors/user.selectors';
import { CreateTicket } from 'src/app/_models/ticket/create-ticket';
import { Type } from 'src/app/_models/ticket/type';
import { User } from 'src/app/_models/user/User';
import { TicketService } from 'src/app/_services/api/ticket.service';
import { TypeService } from 'src/app/_services/api/type.service';
import { UserService } from 'src/app/_services/api/user.service';
import { MessagingService } from 'src/app/_services/messaging.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent implements OnInit {
  public createForm: FormGroup = this.fb.group({
    description: this.fb.control(''),
    title: this.fb.control('', Validators.required),
    type: this.fb.control(null, Validators.required),
    assignee: this.fb.control(null),
    ownerId: this.fb.control(null, Validators.required),
    dueDate: this.fb.control(null)
  });

  public text: any = '';
  public types$: Observable<Type[]>;
  public user: User;
  users$: Observable<User[]>;
  userLoading = false;
  userInput$ = new Subject<string>();
  pushToken: string;

  constructor(
    private fb: FormBuilder,
    private typeService: TypeService,
    private userService: UserService,
    private ticketService: TicketService,
    private store: Store<UserState>,
    private tokenStore: Store<PushTokenState>,
    private toastr: ToastrService,
    private router: Router,
    private messagingService: MessagingService
  ) {
    this.store
      .pipe(select(getUser))
      .pipe(
        map((user) => {
          this.user = user;
          this.createForm.get('ownerId').setValue(this.user.id);
          this.createForm.get('ownerId').patchValue(this.user.id);
        })
      )
      .subscribe();

    this.tokenStore.pipe(select(getPushToken)).subscribe(
      tokenState => {
        console.log(tokenState)
        this.pushToken = tokenState.token
      }
    )
  }

  ngOnInit(): void {
    this.types$ = this.typeService
      .getAllStatusses()
      .pipe(map((res) => res.types));

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

  trackByFn(user: User) {
    return user.id;
}

  public onSubmit() {
        const createForm: CreateTicket = new CreateTicket(this.createForm.value);

    this.ticketService.createTicket(createForm).pipe(
      catchError(e => {
        this.toastr.error('Error Creating ticket', 'Create ticket');
        throw(e);
      })
    )
    .subscribe(
      res => {
        this.toastr.success('Kerkesa u krijua me sukses', 'Krijo kerkese');

        if (this.createForm.value.assignee.roles.map(role => role.role.toLowerCase()).includes('admin')) {
          this.messagingService.sendPushNotification('Pershendetje', this.pushToken, 'Nje kerkese e re per ju').subscribe()
        }
        this.router.navigate([`/ticket/${res}`]);
      },
      e => {
        this.toastr.error('Error Creating ticket', 'Create ticket');
      }
    );
  }
}
