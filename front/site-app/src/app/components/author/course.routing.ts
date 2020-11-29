import { Routes, RouterModule } from '@angular/router';
import { AuthorGuard } from 'src/app/author.guard';
import { EditLessonComponent } from './edit-lesson/edit-lesson.component';
import { PreviewLessonComponent } from './preview-lesson/preview-lesson.component';

const routes: Routes = [
  { path: 'author/course/:courseId/edit-lesson/:lessonId', component: EditLessonComponent, canActivate: [AuthorGuard] },
  { path: 'author/course/:courseId/preview-lesson/:lessonId', component: PreviewLessonComponent, canActivate: [AuthorGuard] },
  // { path: 'author/edit-course/:courseId', component: CourseComponent },
];

export const AuthorRoutes = RouterModule.forChild(routes);
