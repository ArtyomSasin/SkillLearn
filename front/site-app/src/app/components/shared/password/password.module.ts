import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './password.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { PipesModule } from 'src/app/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
  ],
  exports: [
    PasswordComponent,
  ],
  declarations: [PasswordComponent]
})
export class PasswordModule { }
