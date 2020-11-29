import { Component, Input, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/shared/models/course';
import { Lesson } from 'src/app/shared/models/lesson';

@Component({
  selector: 'app-course-card-small',
  templateUrl: './course-card-small.component.html',
  styleUrls: ['./course-card-small.component.css']
})
export class CourseCardSmallComponent implements OnInit {
  @Input() course?: Course;
  isLoaded = false;

  constructor(
    private courseService: CourseService,
  ) { }

  ngOnInit(): void {
  }

  async loadLessons(): Promise<void> {
    if (this.course?.lessonIds && this.course?.lessonIds.length > 0) {
      const lessons = await this.courseService.getLessons(this.course.lessonIds);
      this.course.lessons = lessons;
      this.isLoaded = true;
    }
  }
}
