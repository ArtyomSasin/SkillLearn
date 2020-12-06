import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadFileDialogComponent } from './load-file-dialog.component';
import { MaterialModule } from 'src/app/shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [LoadFileDialogComponent],
  declarations: [LoadFileDialogComponent]
})
export class LoadFileDialogModule { }
