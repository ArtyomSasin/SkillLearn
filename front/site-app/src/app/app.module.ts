import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthModule, OidcConfigService } from 'angular-auth-oidc-client';
import { AuthorizeGuard } from './authorize.guard';
import { DefaultComponent } from './components/default/default.component';
import { PostComponent } from './components/post/post.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { MaterialModule } from './shared/material.module';
import { environment } from 'src/environments/environment';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

export function configureAuth(oidcConfigService: OidcConfigService): any {
  console.log('configureWith');
  return () =>
    oidcConfigService.withConfig({
      stsServer: environment.AUTH_URL,
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      clientId: 'SkillLearn.SPA',
      scope: 'openid profile email offline_access SkillLearn_Api',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
    });
}

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    PostComponent,
    PostDetailComponent,
    LessonComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule.forRoot(),
    MaterialModule,
  ],
  providers: [
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    AuthorizeGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
