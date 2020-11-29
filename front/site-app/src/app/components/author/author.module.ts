import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { ProgressBarModule } from '../shared/progress-bar/progress-bar.module';
import { RouterModule } from '@angular/router';
import { AuthorRoutes } from './course.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { HtmlDialogModule } from '../dialogs/html-dialog/html-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    ProgressBarModule,
    HtmlDialogModule,
    AuthorRoutes,
  ],
  exports: [EditLessonComponent],
  declarations: [EditLessonComponent]
})
export class AuthorModule { }
