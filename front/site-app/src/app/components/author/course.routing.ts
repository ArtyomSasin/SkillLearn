import { Routes, RouterModule } from '@angular/router';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { PreviewLessonComponent } from './preview-lesson/preview-lesson.component';

const routes: Routes = [
  { path: 'author/course/:courseId/edit-lesson/:lessonId', component: EditLessonComponent },
  { path: 'author/course/:courseId/preview-lesson/:lessonId', component: PreviewLessonComponent },
  // { path: 'author/edit-course/:courseId', component: CourseComponent },
];

export const AuthorRoutes = RouterModule.forChild(routes);
