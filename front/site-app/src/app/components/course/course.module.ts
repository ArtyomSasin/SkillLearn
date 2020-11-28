import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course/course.component';
import { CourseRoutes } from './course.routing';

@NgModule({
  imports: [
    CommonModule,
    CourseRoutes,
  ],
  exports: [CourseComponent],
  declarations: [CourseComponent]
})
export class CourseModule { }
