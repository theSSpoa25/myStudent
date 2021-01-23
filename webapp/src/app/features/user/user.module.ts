import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserViewComponent } from './user-view/user-view.component';
import { SharedModule } from 'src/app/_shared/_shared.module';
import { UserComponent } from './user.component';
import { UserPresentationComponent } from './user-presentation/user-presentation.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AllUsersComponent } from './all-users/all-users.component';
import { UsersPresentationComponent } from './all-users/users-presentation/users-presentation.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [UserViewComponent, UserComponent, UserPresentationComponent, CreateUserComponent, AllUsersComponent, UsersPresentationComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxDatatableModule,
    FontAwesomeModule
  ]
})
export class UserModule { }
