import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Toast, ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/api/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  public roles = [
    'ADMIN',
    'USER'
  ];
  public createForm: FormGroup = this.fb.group({
    username: this.fb.control('', Validators.required),
    email: this.fb.control('', [Validators.required, Validators.email]),
    roles: this.fb.control([], [Validators.required]),
    password: this.fb.control([], [Validators.required]),
    confirm: this.fb.control(''),
    name: this.fb.control(''),
    surname: this.fb.control(''),
    address: this.fb.control(''),
  }, { validator: confirmPasswordValidator})

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.createForm.valid) {
      console.log(this.createForm)
      this.userService.createUser(this.createForm.value).subscribe(
        res => {
          this.toastr.success(`User created successfully`, 'Create');
          this.router.navigate([`user/${res}/edit`])

        }
      )
    } else {
      console.log(this.createForm.invalid)
    }
  }

}

export function confirmPasswordValidator(group:FormGroup) {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirm')?.value;

  return _.isEqual(password, confirmPassword);
}
