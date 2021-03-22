import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { AllIssuesComponent } from './all-issues/all-issues.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { IssueComponent } from './issue/issue.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateTicketComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'all',
    component: AllIssuesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':id',
    component: IssueComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
