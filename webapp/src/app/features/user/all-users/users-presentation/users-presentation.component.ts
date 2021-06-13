import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faTrash, faUserEdit, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { User } from 'src/app/_models/user/User';

@Component({
  selector: 'app-users-presentation',
  templateUrl: './users-presentation.component.html',
  styleUrls: ['./users-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersPresentationComponent implements OnInit {

  @Input() users!: User[] | null;
  @Input() selected: any[] = [];
  @Output() onEditUser: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();
  @Output() activateUser: EventEmitter<number> = new EventEmitter<number>();


  loadingIndicator = true;
  reorderable = true;

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  columns = [
    { name: 'Id', summaryFunc: () => null },
    { name: 'Username', summaryFunc: () => null },
    { name: 'Email', summaryFunc: () => null },
    { name: 'Roles', summaryFunc: () => null },
  ];

  faTrash = faTrash;
  faUserEdit = faUserEdit;
  faPlusCircle = faPlusCircle;
  faEye = faEye;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSelect({ selected }: any) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event: any) {
    console.log('Activate Event', event);
  }

  editUser(id: number) {
    this.onEditUser.emit(id);
  }

  onDeleteUser(value: number) {
    this.deleteUser.emit(value);
  }

  onActivateUser(value: number) {
    this.activateUser.emit(value);
  }

  goTo(id: number) {
    this.router.navigate([`/user/${id}/edit`]);
  }
}
