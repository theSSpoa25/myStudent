import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { concat, Observable, of, Subject } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  switchMap,
  tap
} from 'rxjs/operators';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { getUser } from 'src/app/store/selectors/user.selectors';
import { CreateTicket } from 'src/app/_models/ticket/create-ticket';
import { Type } from 'src/app/_models/ticket/type';
import { User } from 'src/app/_models/user/User';
import { TicketService } from 'src/app/_services/api/ticket.service';
import { TypeService } from 'src/app/_services/api/type.service';
import { UserService } from 'src/app/_services/api/user.service';

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

  constructor(
    private fb: FormBuilder,
    private typeService: TypeService,
    private userService: UserService,
    private ticketService: TicketService,
    private store: Store<UserState>
  ) {
    this.store
      .pipe(select(getUser))
      .pipe(
        map((user) => {
          this.user = user;
          this.createForm.get('ownerId').setValue(this.user.id);
          this.createForm.get('ownerId').patchValue(this.user.id);
          console.log(user)
        })
      )
      .subscribe();
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
    console.log(this.createForm.value);

    const createForm: CreateTicket = new CreateTicket(this.createForm.value);

    this.ticketService.createTicket(createForm).subscribe(
      res => console.log(res)
    );
  }
}
