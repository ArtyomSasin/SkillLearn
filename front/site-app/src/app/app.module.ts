import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthorizeGuard } from './authorize.guard';
import { DefaultComponent } from './components/default/default.component';
import { MaterialModule } from './shared/material.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import firebase from 'firebase/app';
import { AuthService } from './services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomErrorPipe } from './shared/pipes/custom-error.pipe';
import { PasswordComponent } from './components/shared/password/password.component';
import { EmailComponent } from './components/shared/email/email.component';
import { ProgressBarComponent } from './components/shared/progress-bar/progress-bar.component';
import { RouterModule } from '@angular/router';

const firebaseConfig = {
  apiKey: 'AIzaSyD84KD37S_La_RWQiGwJiZQgpgFtxPm56s',
  authDomain: 'skill-learn.firebaseapp.com',
  databaseURL: 'https://skill-learn.firebaseio.com',
  projectId: 'skill-learn',
  storageBucket: 'skill-learn.appspot.com',
  messagingSenderId: '311005449078',
  appId: '1:311005449078:web:a8dcc702f4b58a92fe0857',
  measurementId: 'G-ZBVLREPZFT'
};

firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    PasswordComponent,
    EmailComponent,
    ProgressBarComponent,
    CustomErrorPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    // Firebase modules
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [
    AuthorizeGuard,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
