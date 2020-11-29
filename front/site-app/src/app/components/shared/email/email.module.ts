import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { EmailComponent } from './email.component';
import { PipesModule } from 'src/app/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PipesModule,
  ],
  exports: [
    EmailComponent,
  ],
  declarations: [EmailComponent]
})
export class EmailModule { }
