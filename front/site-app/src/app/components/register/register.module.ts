import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomErrorPipe } from 'src/app/shared/pipes/custom-error.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [RegisterComponent],
  declarations: [RegisterComponent, CustomErrorPipe]
})
export class RegisterModule { }
