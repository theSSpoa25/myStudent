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

@NgModule({
  declarations: [TicketComponent, CreateTicketComponent],
  imports: [
    CommonModule,
    TicketRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    EditorModule,
    PanelModule,
    NgSelectModule,
    CalendarModule
  ]
})
export class TicketModule { }
