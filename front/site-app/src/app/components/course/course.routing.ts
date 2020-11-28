import { Routes, RouterModule } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { LessonsComponent } from './lesson/lesson.component';

const routes: Routes = [
  { path: 'course/:courseId/lesson/:lessonId', component: LessonsComponent },
  { path: 'course/:id', component: CourseComponent },
];

export const CourseRoutes = RouterModule.forChild(routes);
