import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { ProgressBarModule } from '../shared/progress-bar/progress-bar.module';
import { RouterModule } from '@angular/router';
import { AuthorRoutes } from './course.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { HtmlDialogModule } from '../dialogs/html-dialog/html-dialog.module';
import { PreviewLessonComponent } from './preview-lesson/preview-lesson.component';
import { TextEditorModule } from '../text-editor/text-editor.module';
import { EditCourseComponent } from './edit-course/edit-course.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    ProgressBarModule,
    HtmlDialogModule,
    TextEditorModule,
    AuthorRoutes,
  ],
  exports: [EditLessonComponent, PreviewLessonComponent, EditCourseComponent],
  declarations: [EditLessonComponent, PreviewLessonComponent, EditCourseComponent]
})
export class AuthorModule { }
