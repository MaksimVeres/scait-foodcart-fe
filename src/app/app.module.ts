import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthSignInComponent} from './auth-sign-in/auth-sign-in.component';
import {HeaderComponent} from './app-header/header.component';
import {AuthSignUpComponent} from './auth-sign-up/auth-sign-up.component';
import {RouterModule} from '@angular/router';
import {MainComponent} from './main/main.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    AuthSignInComponent,
    HeaderComponent,
    AuthSignUpComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {path: 'auth/sign-in', component: AuthSignInComponent},
        {path: 'auth/sign-up', component: AuthSignUpComponent},
        {path: '', component: MainComponent, canActivate: [AuthGuard]}
      ]
    ),
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
