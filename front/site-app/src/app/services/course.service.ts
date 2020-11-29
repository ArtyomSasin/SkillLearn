import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../shared/models/course';
import { Lesson, toDbContent, toDbLesson } from '../shared/models/lesson';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courses = 'courses';
  lessons = 'lessons';
  contents = 'contents';

  constructor(private firestore: AngularFirestore) { }

  public getCoursesBySkill(skillGroupIds: string[]): Observable<Course[]> {
    console.log('getCoursesBySkill() skillGroupIds: ', skillGroupIds);

    return this.firestore
      .collection(this.courses, ref => ref.where('skillGroupIds', 'array-contains-any', skillGroupIds))
      .valueChanges() as Observable<Course[]>;
  }

  public async getCourse(courseId: string, withLessons: boolean): Promise<Course> {
    console.log('getCourse() courseId: ', courseId);

    const course = await this.firestore.collection(this.courses)
      .doc(courseId)
      .get()
      .pipe(map(value => value.data() as Course))
      .toPromise();
    if (withLessons && course.lessonIds) {
      if (course.lessonIds?.length > 0) {
        const lessons = await this.getLessons(course.lessonIds);
        course.lessons = lessons;
      }
    }
    return course;
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

  public async getLesson(lessonId: string, withContent: boolean): Promise<Lesson> {
    console.log('getLesson() lessonId: ', lessonId);
    const lesson = await
      this.firestore.collection(this.lessons)
        .doc(lessonId)
        .get()
        .pipe(map(value => value.data() as Lesson))
        .toPromise();

    if (withContent) {
      console.log('getContent lessonId: ', lessonId);
      const content = await this.firestore.collection(this.contents)
        .doc(lessonId)
        .get()
        .pipe(map(value => value.data() as any))
        .toPromise();
      lesson.content = content.content;
    }
    return lesson;
  }

  public updateLesson(lesson: Lesson): Promise<void> {
    console.log('updateLesson() lesson: ', lesson);

    const refLesson = this.firestore.collection(this.lessons).doc(lesson.id).ref;
    const refContent = this.firestore.collection(this.contents).doc(lesson.id).ref;

    return this.firestore.firestore.runTransaction(transaction => {
      return transaction.get(refLesson).then(snapshot => {
        transaction
          .update(refLesson, toDbLesson(lesson)) // Обновляем урок
          .update(refContent, toDbContent(lesson))// Обновляем контент
          ;
      });
    });
  }

  public async createLesson(courseId: string, lesson: Lesson): Promise<void> {
    console.log('createLesson() lesson: ', lesson);
    const refLesson = this.firestore.collection(this.lessons).doc().ref;

    // Генерируем id
    const id = refLesson.id as string;
    // Обновляем id у урока
    lesson.id = id;

    const refCourse = this.firestore.collection(this.courses).doc(courseId).ref;
    const refContent = this.firestore.collection(this.contents).doc(id).ref;

    return this.firestore.firestore.runTransaction(transaction => {
      return transaction.get(refCourse).then(snapshot => {
        const course = snapshot.data() as Course;
        course.lessonIds?.push(id);
        transaction
          .set(refLesson, toDbLesson(lesson)) // Создаем урок
          .set(refContent, toDbContent(lesson)) // Создаем контент
          .update(refCourse, { lessonIds: course.lessonIds }) // Обновляем lessonIds у курса
          ;
      });
    });
  }
}
