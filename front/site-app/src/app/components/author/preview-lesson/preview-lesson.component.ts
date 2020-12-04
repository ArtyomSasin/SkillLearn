import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { Lesson, LessonTypes } from 'src/app/shared/models/lesson';

@Component({
  selector: 'app-preview-lesson',
  templateUrl: './preview-lesson.component.html',
  styleUrls: ['./preview-lesson.component.css']
})
export class PreviewLessonComponent implements OnInit {
  courseId: any;
  lessonId: any;
  lesson?: Lesson;
  /** Количество уроков */
  maxOrder = 0;
  showProgress = true;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.showProgress = true;
      console.log(params);
      this.courseId = params.courseId;
      this.lessonId = params.lessonId;

      // Получаем информацию о курсе и уроках
      const course = await this.courseService.getCourse(this.courseId, true);
      console.log('course: ', course);

      // Вычисляем максимальный порядковый номер статей
      if (course.lessons && course.lessons?.length > 0) {
        this.maxOrder = Math.max(...course.lessons.map(l => l.order));
      } else {
        this.maxOrder = 0;
      }

      // Если передан lessonId, получаем информацию о нем
      if (this.lessonId) {
        const lesson = await this.courseService.getLesson(this.lessonId, true);
        this.lesson = lesson;
      }
      this.showProgress = false;
    });
  }

  editorClick(): void {

  }
}
