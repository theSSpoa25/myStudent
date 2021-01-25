import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UserState } from 'src/app/store/reducers/user.reducer';
import { User } from 'src/app/_models/user/User';

@Component({
  selector: 'app-user-presentation',
  templateUrl: './user-presentation.component.html',
  styleUrls: ['./user-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPresentationComponent implements OnInit {

  @Input()  user!: User | null; 

  constructor() { }

  ngOnInit(): void {
  }

}
