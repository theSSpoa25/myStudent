import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/_services/api/authentication.service';
import { catchError, first, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { Action } from 'rxjs/internal/scheduler/Action';
import { userLogin } from 'src/app/store/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup = this.fb.group({
    username: this.fb.control('', Validators.required),
    password: this.fb.control('', [Validators.required, Validators.min(3)])
  });
  public invalid: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private store: Store<UserState>
  ) { }

  ngOnInit(): void {
    
  }

  public authenticateUser() {
    this.authenticationService.authenticate(this.username, this.password).pipe(
      first(),
      map( res => {
       this.invalid = false;
       this.store.dispatch(userLogin({user: res}));
      }),
      catchError(error => {
        this.invalid = true;
        return of(error);
      })
    ).subscribe()
  }

  private get username() {
    return this.loginForm.controls['username'].value;
  }

  private get password() {
    return this.loginForm.controls['password'].value;
  }

}
