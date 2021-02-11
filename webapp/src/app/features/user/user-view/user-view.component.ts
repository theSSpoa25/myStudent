import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, pipe, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { User } from 'src/app/_models/user/User';
import { UserService } from 'src/app/_services/api/user.service';
import toNumber from 'lodash/toNumber';
import { ToastrService } from 'ngx-toastr';
import { mergeMap, take } from 'rxjs/operators';
import { ProfilePicture } from 'src/app/_models/user/profile-picture';
@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html'
})
export class UserViewComponent implements OnInit {

  public user$!: Observable<User>;
  public userProfile$!: Observable<ProfilePicture>;
  id: string | null;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.user$ = this.userService.getUser(toNumber(this.id)).pipe(
      map((res: User) => {
        return res;
      })
    );

   this.userProfile$ = this.userService.getProfilePicture(toNumber(this.id));
  }

  onUserUpdate(userUpdate: any) {
    const id = userUpdate.id;
    const user = userUpdate.userForm
    this.userService.updateUser(id, user).pipe(
      take(1)
    ).subscribe(
      res => {
          this.toastr.success('User Updated Successfully', 'User!');
      }
    )
  }

  onUploadProfilePicture(upload: any) {
    console.log(upload)
    if (upload) {
      const formData = upload.formData;
      const id = upload.id;

      this.userService.uploadProfilePicture(id, formData).pipe(
        take(1),
        mergeMap(res => {
          this.userProfile$ = this.userService.getProfilePicture(toNumber(this.id));
          return of(res)
        })
      ).subscribe()
    }
  }

}
