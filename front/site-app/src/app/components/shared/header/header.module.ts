import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule { }
