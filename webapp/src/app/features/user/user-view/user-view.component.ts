import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { User } from 'src/app/_models/user/User';
import { UserService } from 'src/app/_services/api/user.service';
import toNumber from 'lodash/toNumber';
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html'
})
export class UserViewComponent implements OnInit {

  public user$!: Observable<User>;
  id: string | null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.user$ = this.userService.getUser(toNumber(this.id)).pipe(
      map((res: User) => {
        console.log(res)
        return res;
      })
    );
  }

}
