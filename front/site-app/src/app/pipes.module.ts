import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomErrorPipe } from './shared/pipes/custom-error.pipe';
import { SortLessonsPipe } from './shared/pipes/sort-order.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [CustomErrorPipe, SortLessonsPipe],
  declarations: [CustomErrorPipe, SortLessonsPipe]
})
export class PipesModule { }
