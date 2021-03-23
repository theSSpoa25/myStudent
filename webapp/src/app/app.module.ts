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
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireMessagingModule} from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './_services/messaging.service';

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
    NgxDatatableModule,
    ToastrModule.forRoot(
      {
        positionClass: 'toast-top-right',
        timeOut: 3000,
        preventDuplicates: true,
      }
    ), // ToastrModule added
    BrowserAnimationsModule,
    AngularFireMessagingModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase)

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    MessagingService
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
