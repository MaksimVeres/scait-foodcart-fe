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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './guards/auth.guard';
import {ArticlePageComponent} from './article-page/article-page.component';
import {ArticleNewComponent} from './article-new/article-new.component';
import {ProfilePageComponent} from './profile-page/profile-page.component';
import {OwnProfilePageComponent} from './own-profile-page/own-profile-page.component';
import {PasswordChangePageComponent} from './password-change-page/password-change-page.component';
import {ArticleCreatePageComponent} from './article-create-page/article-create-page.component';
import {ArticleEditPageComponent} from './article-edit-page/article-edit-page.component';
import {OwnArticlesPageComponent} from './own-articles-page/own-articles-page.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthSignInComponent,
    HeaderComponent,
    AuthSignUpComponent,
    MainComponent,
    ArticlePageComponent,
    ArticleNewComponent,
    ProfilePageComponent,
    OwnProfilePageComponent,
    PasswordChangePageComponent,
    ArticleCreatePageComponent,
    ArticleEditPageComponent,
    OwnArticlesPageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot(
      [
        {path: 'auth/sign-in', component: AuthSignInComponent},
        {path: 'auth/sign-up', component: AuthSignUpComponent},
        {path: 'articles', component: MainComponent},
        {path: 'articles/new', component: ArticleCreatePageComponent},
        {path: 'articles/my', component: OwnArticlesPageComponent},
        {path: 'articles/:uuid', component: ArticlePageComponent},
        {path: 'articles/:uuid/edit', component: ArticleEditPageComponent},
        {path: 'user/my', component: OwnProfilePageComponent},
        {path: 'user/my/password-change', component: PasswordChangePageComponent},
        {path: 'user/:uuid', component: ProfilePageComponent}
      ]
    ),
    ReactiveFormsModule,
    FormsModule
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
