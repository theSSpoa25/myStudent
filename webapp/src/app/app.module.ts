import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './features/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store/reducers';
import { SharedModule } from './_shared/_shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpErrorInterceptor } from './_interceptors/http-error.interceptor';
import { UserEffects } from './store/effects/user.effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './features/home/home.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserFilterComponent } from './_shared/modals/user-filter/user-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({
      name: 'WebApp',
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([UserEffects]),
    SharedModule,
    NgSelectModule,
    FontAwesomeModule,
    NgxDatatableModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
