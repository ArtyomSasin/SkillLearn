import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from '../shared/password/password.module';
import { EmailModule } from '../shared/email/email.module';
import { ProgressBarModule } from '../shared/progress-bar/progress-bar.module';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    PasswordModule,
    EmailModule,
    ProgressBarModule,
    PipesModule
  ],
  exports: [LoginComponent],
  declarations: [
    LoginComponent,
  ]
})
export class LoginModule { }
