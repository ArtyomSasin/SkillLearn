import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardSmallComponent } from './course-card-small.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { PipesModule } from 'src/app/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    PipesModule,
  ],
  exports: [CourseCardSmallComponent],
  declarations: [CourseCardSmallComponent]
})
export class CourseCardSmallModule { }
