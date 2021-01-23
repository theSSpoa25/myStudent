import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'lodash';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/_models/user/User';
import { UserService } from 'src/app/_services/api/user.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  allUsers$: Observable<User[]> | undefined;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.allUsers$ = this.userService.getAllUsers().pipe(
    );
  }

  viewUser(id: number) {
    this.router.navigate([`user/${id}/view`]);
  }

}
