import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faFilter, faPlusCircle, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user/User';
import { UserService } from 'src/app/_services/api/user.service';
import { UserFilterComponent } from 'src/app/_shared/modals/user-filter/user-filter.component';
import omitBy from 'lodash/omitBy';
@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {

  allUsers$: Observable<User[]> | undefined;
  faFIlter = faFilter;
  faTrash = faTrash;
  faPlusCircle = faPlusCircle;
  selected: any[] = [];
  modalRef!: BsModalRef;
  public filterForm: FormGroup = this.fb.group({
    username: this.fb.control(''),
    role: this.fb.control(''),
    email: this.fb.control(''),
    id: this.fb.control(''),
    active: this.fb.control(false)
  })

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: BsModalService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.allUsers$ = this.userService.getAllUsers().pipe(
    );
  }

  editUser(id: number) {
    this.router.navigate([`user/${id}/edit`]);
  }

  onMakeActive() {
    console.log(this.selected)
  }

  onDelete() {
    console.log(this.selected)
  }

  onFilter() {
    const initialState = {
      filterForm: this.filterForm
    }
    this.modalRef = this.modalService.show(UserFilterComponent, {initialState});

    this.modalRef.content.event.subscribe((fg:  FormGroup) => {
      console.log(fg)
      let searchQuery = this.getSearchQuery(fg);


      console.log(searchQuery)
      this.router.navigate(['/user/all'], {queryParams: this.getFilledFields(fg)});
      this.allUsers$ = this.userService.searchUser(searchQuery);
    });
  }


  private getSearchQuery(fg: FormGroup) {
    let searchQuery = '';

    Object.keys(fg.value).forEach(
      key => {
        const value = fg.get(key)?.value;

        if (value) {
          searchQuery += `${key}=${value}&`;
        }
      }
    );
    return searchQuery;
  }

  private getFilledFields(fg: FormGroup) {
    return omitBy(fg.value, (value) => {console.log('value', value); return !value || value.length === 0})
  }
}
