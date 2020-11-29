import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../shared/models/course';
import { Lesson, toDbLesson } from '../shared/models/lesson';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courses = 'courses';
  lessons = 'lessons';

  constructor(private firestore: AngularFirestore) { }

  public getCoursesBySkill(skillIds: string[]): Observable<Course[]> {
    console.log('getCoursesBySkill() skillIds: ', skillIds);

    return this.firestore
      .collection(this.courses, ref => ref.where('skillIds', 'array-contains-any', skillIds))
      .valueChanges() as Observable<Course[]>;
  }

  public getCourse(courseId: string): Promise<Course> {
    console.log('getCourse() courseId: ', courseId);

    return this.firestore.collection(this.courses)
      .doc(courseId)
      .get()
      .pipe(map(value => value.data() as Course))
      .toPromise();
  }

  public getLessons(lessonIds: string[]): Promise<Lesson[]> {
    console.log('getLessons() lessonIds: ', lessonIds);
    return this.firestore.collection(this.lessons, ref => ref.where('id', 'in', lessonIds))
      .get()
      .pipe(map(value => {
        console.log(value);
        return value.docs.map(d => d.data() as Lesson);
      }))
      .toPromise();
  }

  public getLesson(lessonId: string): Promise<Lesson> {
    console.log('getLesson() lessonId: ', lessonId);
    return this.firestore.collection(this.lessons)
      .doc(lessonId)
      .get()
      .pipe(map(value => value.data() as Lesson))
      .toPromise();
  }

  public updateLesson(lesson: Lesson): Promise<void> {
    console.log('updateLesson() lesson: ', lesson);
    return this.firestore.collection(this.lessons).doc(lesson.id).set(toDbLesson(lesson));
  }

  public async createLesson(courseId: string, lesson: Lesson): Promise<void> {
    console.log('createLesson() lesson: ', lesson);
    const refLesson = this.firestore.collection(this.lessons).doc().ref;
    const refCourse = this.firestore.collection(this.courses).doc(courseId).ref;
    // Генерируем id
    const id = refLesson.id as string;
    // Обновляем id у урока
    lesson.id = id;

    return this.firestore.firestore.runTransaction(transaction => {
      return transaction.get(refCourse).then(snapshot => {
        const course = snapshot.data() as Course;
        course.lessonIds?.push(id);
        transaction
          .set(refLesson, toDbLesson(lesson)) // Создаем урок
          .update(refCourse, { lessonIds: course.lessonIds }) // Обновляем lessonIds у курса
          ;
      });
    });
  }
}
