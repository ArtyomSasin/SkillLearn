import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Course } from '../shared/models/course';
import { Lesson } from '../shared/models/lesson';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private firestore: AngularFirestore) { }

  public getCourses(skillIds: number[]): Observable<Course[]> {
    return this.firestore
      .collection('courses', ref => ref.where('skills', 'array-contains-any', skillIds))
      .valueChanges() as Observable<Course[]>;
  }

  public getCourse(courseId: number): Promise<Course> {
    throw Error();
  }

  public getLessons(courseId: number): Promise<Lesson[]> {
    throw Error();
  }

  public getLesson(lessonId: number): Promise<Lesson> {
    throw Error();
  }
}
