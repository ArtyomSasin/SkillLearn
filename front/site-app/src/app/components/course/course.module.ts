import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course/course.component';
import { CourseRoutes } from './course.routing';
import { CourseCardSmallModule } from '../shared/course-card-small/course-card-small.module';
import { ProgressBarModule } from '../shared/progress-bar/progress-bar.module';
import { LessonsComponent } from './lesson/lesson.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { PipesModule } from 'src/app/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    CourseRoutes,
    MaterialModule,
    ProgressBarModule,
    CourseCardSmallModule,
    PipesModule,
  ],
  exports: [CourseComponent, LessonsComponent],
  declarations: [CourseComponent, LessonsComponent]
})
export class CourseModule { }
