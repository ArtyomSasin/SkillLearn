import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from '../shared/password/password.module';
import { PasswordComponent } from '../shared/password/password.component';
import { EmailModule } from '../shared/email/email.module';
import { EmailComponent } from '../shared/email/email.component';
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
    PipesModule,
  ],
  exports: [RegisterComponent],
  declarations: [
    RegisterComponent,
    PasswordComponent,
    EmailComponent,
  ]
})
export class RegisterModule { }
