import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorService } from 'src/app/services/author.service';
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
    private authorService: AuthorService,
    private route: ActivatedRoute,
  ) {
    this.course = null;
  }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      console.log('params', params);
      const courseId = params.courseId;
      const course = await this.courseService.getCourse(courseId);
      console.log(course.lessonIds);
      if (course.lessonIds && course.lessonIds.length > 0) {
        const lessons = await this.courseService.getLessons(course.lessonIds);
        course.lessons = lessons;

        // Получаем информацию об авторе и можно ли редактировать статью
        const userId = this.authService.user?.uid;
        if (userId) {
          this.canEdit = await this.authorService.isAuthor(userId);
        }
      }
      this.course = course;
    });
  }
}
