import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
    FontAwesomeModule
  ],
  exports: [
    HeaderComponent,
    DashboardComponent
  ],
})
export class SharedModule {
}
