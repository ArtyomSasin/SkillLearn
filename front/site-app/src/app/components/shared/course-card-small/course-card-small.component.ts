import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/shared/models/course';

@Component({
  selector: 'app-course-card-small',
  templateUrl: './course-card-small.component.html',
  styleUrls: ['./course-card-small.component.css']
})
export class CourseCardSmallComponent implements OnInit {
  @Input() course?: Course;
  showLessons = false;

  constructor() {
  }

  ngOnInit(): void {
  }
}
