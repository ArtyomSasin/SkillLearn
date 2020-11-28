import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { CustomErrorPipe } from 'src/app/shared/pipes/custom-error.pipe';
import { EmailComponent } from './email.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    EmailComponent,
  ],
  declarations: [EmailComponent, CustomErrorPipe]
})
export class EmailModule { }
