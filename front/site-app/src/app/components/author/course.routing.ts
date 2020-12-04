import { Routes, RouterModule } from '@angular/router';
import { OnlyAuthorGuard } from 'src/app/only-author.guard';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { PreviewLessonComponent } from './preview-lesson/preview-lesson.component';

const routes: Routes = [
  { path: 'author/course/:courseId/edit-lesson/:lessonId', component: EditLessonComponent, canActivate: [OnlyAuthorGuard] },
  { path: 'author/course/:courseId/preview-lesson/:lessonId', component: PreviewLessonComponent, canActivate: [OnlyAuthorGuard] },
  { path: 'author/edit-course/:courseId', component: EditCourseComponent, canActivate: [OnlyAuthorGuard] },
];

export const AuthorRoutes = RouterModule.forChild(routes);
