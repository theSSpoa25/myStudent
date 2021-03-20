import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserFilterComponent } from './modals/user-filter/user-filter.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { ToImagePipe } from './_pipes/to-image.pipe';
import { AutoFocusDirective } from '../_directives/auto-focus.directive';
import { SanitizerPipe } from './_pipes/sanitizer.pipe';
import { DateFormatPipe } from './_pipes/date-format.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,
    UserFilterComponent,
    ToImagePipe,
    AutoFocusDirective,
    SanitizerPipe,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FontAwesomeModule,
    ModalModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    DashboardComponent,
    UserFilterComponent,
    ToImagePipe,
    AutoFocusDirective,
    SanitizerPipe,
    DateFormatPipe
  ],
  entryComponents: [UserFilterComponent]
})
export class SharedModule {
}
