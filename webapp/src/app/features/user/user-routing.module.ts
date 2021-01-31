import { AUTO_STYLE } from '@angular/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { AllUsersComponent } from './all-users/all-users.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ':id/view',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id/edit',
    component: UserViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'all',
    component: AllUsersComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
