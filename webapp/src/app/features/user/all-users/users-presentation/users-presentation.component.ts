import { Component, Input, OnInit } from '@angular/core';
import { faEye, faTrash, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { User } from 'src/app/_models/user/User';

@Component({
  selector: 'app-users-presentation',
  templateUrl: './users-presentation.component.html',
  styleUrls: ['./users-presentation.component.scss']
})
export class UsersPresentationComponent implements OnInit {

  @Input() users!: User[] | null;
  loadingIndicator = true;
  reorderable = true;
  selected: any[] = [];
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
  faEye = faEye;

  constructor() { }

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

  viewUser(value: any) {
    console.log(value)

  }

  editUser(value: any) {
    console.log(value)

  }

  deleteUser(value: any) {
    console.log(value)

  }
}
