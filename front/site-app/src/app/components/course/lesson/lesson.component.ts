import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/shared/models/course';
import { Lesson } from 'src/app/shared/models/lesson';
import { SortLessonsPipe } from 'src/app/shared/pipes/sort-lessons.pipe';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonsComponent implements OnInit {
  lesson: Lesson | null = null;
  courseId: string | null = null;
  nextLessonId?: string | null = null;
  course?: Course;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private sortLessonsPipe: SortLessonsPipe
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      console.log('params', params);
      const lessonId = params.lessonId;
      this.courseId = params.courseId as string;
      this.lesson = await this.courseService.getLesson(lessonId, true);
      this.course = await this.courseService.getCourse(this.courseId, true);
      this.course.lessons = this.sortLessonsPipe.transform(this.course.lessons) ?? [];
      console.log('lessons: ', this.course.lessons);
      this.nextLessonId = null;
      // есть ли следующий урок?
      if (this.course && this.course.lessons && this.lesson) {
        // ищем текущий урок
        const index = this.course.lessons.findIndex(l => l.id === this.lesson?.id);

        if (index !== -1) {
          if (index < this.course.lessons.length - 1) {
            this.nextLessonId = this.course.lessons[index + 1].id;
          }
        }
      }
    });
  }
}
