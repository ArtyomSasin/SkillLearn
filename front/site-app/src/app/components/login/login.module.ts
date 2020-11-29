import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomErrorPipe } from 'src/app/shared/pipes/custom-error.pipe';
import { PasswordModule } from '../shared/password/password.module';
import { EmailModule } from '../shared/email/email.module';
import { ProgressBarModule } from '../shared/progress-bar/progress-bar.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    PasswordModule,
    EmailModule,
    ProgressBarModule,
  ],
  exports: [LoginComponent],
  declarations: [
    LoginComponent,
    CustomErrorPipe,
  ]
})
export class LoginModule { }
