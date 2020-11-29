import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomErrorPipe } from './shared/pipes/custom-error.pipe';
import { SortLessonsPipe } from './shared/pipes/sort-lessons.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [CustomErrorPipe, SortLessonsPipe],
  declarations: [CustomErrorPipe, SortLessonsPipe],
  providers: [SortLessonsPipe],
})
export class PipesModule { }
