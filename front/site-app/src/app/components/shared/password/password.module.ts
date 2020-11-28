import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './password.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { CustomErrorPipe } from 'src/app/shared/pipes/custom-error.pipe';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    PasswordComponent,
  ],
  declarations: [PasswordComponent, CustomErrorPipe]
})
export class PasswordModule { }
