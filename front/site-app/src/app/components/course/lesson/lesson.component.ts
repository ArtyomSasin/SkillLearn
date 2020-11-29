import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Lesson } from 'src/app/shared/models/lesson';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonsComponent implements OnInit {
  lesson: Lesson | null = null;
  courseId: string | null = null;
  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      console.log('params', params);
      const lessonId = params.lessonId;
      this.courseId = params.courseId;
      this.lesson = await this.courseService.getLesson(lessonId);
    });
  }

}
