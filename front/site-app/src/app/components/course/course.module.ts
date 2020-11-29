import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course/course.component';
import { CourseRoutes } from './course.routing';
import { CourseCardSmallModule } from '../shared/course-card-small/course-card-small.module';
import { ProgressBarModule } from '../shared/progress-bar/progress-bar.module';

@NgModule({
  imports: [
    CommonModule,
    CourseRoutes,
    ProgressBarModule,
    CourseCardSmallModule,
  ],
  exports: [CourseComponent],
  declarations: [CourseComponent,]
})
export class CourseModule { }
