import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { HtmlDialogComponent } from './html-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [HtmlDialogComponent],
  declarations: [HtmlDialogComponent]
})
export class HtmlDialogModule { }
