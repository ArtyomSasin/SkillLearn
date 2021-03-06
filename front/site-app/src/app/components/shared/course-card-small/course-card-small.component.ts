import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AuthorService } from 'src/app/services/author.service';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-course-card-small',
  templateUrl: './course-card-small.component.html',
  styleUrls: ['./course-card-small.component.css']
})
export class CourseCardSmallComponent implements OnInit {
  @Input() course?: Course;
  isLoaded = false;
  canEdit = false;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void { }

  async loadLessons(): Promise<void> {
    this.isLoaded = false;

    if (this.course?.lessonIds && this.course?.lessonIds.length > 0) {
      const lessons = await this.courseService.getLessons(this.course.lessonIds);
      this.course.lessons = lessons;

      // Получаем информацию об авторе и можно ли редактировать статью
      const userId = this.authService.user?.uid;
      this.canEdit = userId === this.course.authorId;
      this.isLoaded = true;
    }
  }
}
