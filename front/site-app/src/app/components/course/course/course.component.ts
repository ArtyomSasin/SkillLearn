import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: Course | null;
  canEdit = false;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {
    this.course = null;
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      console.log('params', params);
      this.canEdit = false;
      const courseId = params.courseId;
      const course = await this.courseService.getCourse(courseId, true);
      if (course?.lessonIds && course?.lessonIds?.length > 0) {
        // Получаем информацию об авторе и можно ли редактировать статью
        const user = await this.authService.getCurrentUser();
        if (user && user.uid === course.authorId) {
          this.canEdit = true;
        }
      }
      this.course = course;
    });
  }
}
