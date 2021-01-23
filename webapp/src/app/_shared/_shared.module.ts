import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([]),
  ],
  exports: [
    HeaderComponent,
    DashboardComponent
  ],
})
export class SharedModule {
}
