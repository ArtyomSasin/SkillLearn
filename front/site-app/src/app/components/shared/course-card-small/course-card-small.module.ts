import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCardSmallComponent } from './course-card-small.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [CourseCardSmallComponent],
  declarations: [CourseCardSmallComponent]
})
export class CourseCardSmallModule { }
