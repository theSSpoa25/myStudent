import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/_models/user/User';
@Component({
  selector: 'app-user-presentation',
  templateUrl: './user-presentation.component.html',
  styleUrls: ['./user-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPresentationComponent implements OnInit {

  @Input()  user!: User | null; 
  @Output() testEvent = new EventEmitter<any>();

  public roles = [
    'ADMIN',
    'USER'
  ];
  userForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: this.fb.control(this.user?.username, Validators.required),
      email: this.fb.control(this.user?.email, [Validators.required, Validators.email]),
      roles: this.fb.control(this.getUserRoles(), [Validators.required]),
      name: this.fb.control(this.user?.name),
      surname: this.fb.control(this.user?.surname),
      address: this.fb.control(this.user?.address)
    })
  }

  saveChanges() {
    if (this.userForm.valid) {
      this.testEvent.emit({
        id: this.user?.id,
        userForm: this.userForm.value
      })
    }
  }

  private getUserRoles() {
    const roles = this.user?.roles as any[];

    return roles.map(role => role.role) as any[];
  }

}
