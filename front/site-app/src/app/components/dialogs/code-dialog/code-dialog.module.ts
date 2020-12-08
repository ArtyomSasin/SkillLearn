import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { CodeDialogComponent } from './code-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [CodeDialogComponent],
  declarations: [CodeDialogComponent]
})
export class CodeDialogModule { }
