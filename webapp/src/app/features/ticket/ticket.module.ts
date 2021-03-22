import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { TicketComponent } from './ticket.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from 'primeng/editor';
import { PanelModule } from 'primeng/panel'
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { IssueComponent } from './issue/issue.component';
import { IssuePresentationComponent } from './issue/issue-presentation/issue-presentation.component';
import { IssueTitleComponent } from './issue/issue-title/issue-title.component';
import { IssueDescriptionComponent } from './issue/issue-description/issue-description.component';
import { IssueAttachementComponent } from './issue/issue-attachement/issue-attachement.component';
import { IssueCommentComponent } from './issue/issue-comment/issue-comment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { SharedModule } from 'src/app/_shared/_shared.module';
import {TabViewModule} from 'primeng/tabview';
import { IssueStatusComponent } from './issue/issue-status/issue-status.component';
import { ChipModule } from 'primeng/chip';
import { IssueAssignComponent } from './issue/issue-assign/issue-assign.component';
import { IssueOwnerComponent } from './issue/issue-owner/issue-owner.component';
import { MenuModule } from 'primeng/menu';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {AvatarModule} from 'primeng/avatar';
import { AllIssuesComponent } from './all-issues/all-issues.component';
import {TableModule} from 'primeng/table';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [TicketComponent, CreateTicketComponent, IssueComponent, IssuePresentationComponent, IssueTitleComponent, IssueDescriptionComponent, IssueAttachementComponent, IssueCommentComponent, IssueStatusComponent, IssueAssignComponent, IssueOwnerComponent, AllIssuesComponent],
  imports: [
    CommonModule,
    TicketRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
    PanelModule,
    NgSelectModule,
    CalendarModule,
    FontAwesomeModule,
    InputTextareaModule,
    SharedModule,
    TabViewModule,
    ChipModule,
    MenuModule,
    OverlayPanelModule,
    AvatarModule,
    TableModule,
    FileUploadModule
  ]
})
export class TicketModule { }
