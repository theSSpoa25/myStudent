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


@NgModule({
  declarations: [UserViewComponent, UserComponent, UserPresentationComponent, CreateUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class UserModule { }
