import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { UserState } from 'src/app/store/reducers/user.reducer';

@Component({
  selector: 'app-user-presentation',
  templateUrl: './user-presentation.component.html',
  styleUrls: ['./user-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPresentationComponent implements OnInit {

  @Input()  user!: UserState | null; 

  constructor() { }

  ngOnInit(): void {
  }

}
