import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  course: Course | null;
  constructor(
    private courseService: CourseService,
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
      }
      this.course = course;
    });
  }
}
