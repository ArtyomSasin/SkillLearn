import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../shared/models/course';
import { Lesson } from '../shared/models/lesson';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courses = 'courses';
  lessons = 'lessons';

  constructor(private firestore: AngularFirestore) { }

  public getCoursesBySkill(skillIds: string[]): Observable<Course[]> {
    return this.firestore
      .collection(this.courses, ref => ref.where('skills', 'array-contains-any', skillIds))
      .valueChanges() as Observable<Course[]>;
  }

  public getCourse(courseId: string): Promise<Course> {
    return this.firestore.collection(this.courses)
      .doc(courseId)
      .get()
      .pipe(map(value => value.data() as Course))
      .toPromise();
  }

  public getLessons(lessonIds: string[]): Promise<Lesson[]> {
    console.log('lessonIds: ', lessonIds);
    return this.firestore.collection(this.lessons, ref => ref.where('id', 'in', lessonIds))
      .get()
      .pipe(map(value => value.docs.map(d => d.data() as Lesson)))
      .toPromise();
  }

  public getLesson(lessonId: number): Promise<Lesson> {
    throw Error();
  }
}
