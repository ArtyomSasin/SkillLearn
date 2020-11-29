import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Lesson, LessonTypes } from 'src/app/shared/models/lesson';
import { HtmlDialogComponent } from '../../dialogs/html-dialog/html-dialog.component';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {
  courseId: any;
  lessonId: any;
  /** Количество уроков */
  maxOrder = 0;

  showProgress = true;
  lessonTypes = LessonTypes;

  form: FormGroup = this.fb.group(
    {
      id: new FormControl(null),
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      content: new FormControl(null),
      order: new FormControl(null),
      type: new FormControl(null),
    }
  );

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private courseService: CourseService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.showProgress = true;
      console.log(params);

      this.courseId = params.courseId;
      this.lessonId = params.lessonId;

      // Получаем информациб о курсе и уроках
      const course = await this.courseService.getCourse(this.courseId);
      const lessons = (course?.lessonIds?.length ?? false) > 0
        ? await this.courseService.getLessons(course?.lessonIds ?? [])
        : null;

      console.log('course: ', course);
      course.lessons = lessons ?? [];

      // Вычисляем максимальный порядковый номер статей
      this.maxOrder = (course.lessons?.length > 0)
        ? Math.max(...course.lessons.map(l => l.order))
        : 0;

      // Если передан lessonId, получаем информацию о нем
      if (this.lessonId) {
        const lesson = await this.courseService.getLesson(this.lessonId);
        this.form.patchValue(lesson);
      } else {
        this.form.patchValue({ id: null, title: '', description: '', type: LessonTypes.theory, order: 0, content: '' });
      }

      this.showProgress = false;
    });
  }
  /** Показать превью урока */
  showPreview(): void {
    this.dialog.open(HtmlDialogComponent, {
      data: this.form.get('content')?.value
    });
  }

  /** Возвращает массив orders, полученный из maxOrder */
  get orders(): number[] {
    // Здесь нужно +1, чтобы при  maxOrder == 0 получить массив из 1 элемента
    return Array.from(Array(this.maxOrder + 1).keys());
  }

  /** Создание нового урока / редактировани существующего */
  async save(): Promise<void> {
    this.showProgress = true;
    try {
      const lesson = this.form.getRawValue() as Lesson;
      console.log('save clicked: ', lesson);
      if (lesson) {
        if (lesson?.id) {
          await this.courseService.updateLesson(lesson);
        } else {
          await this.courseService.createLesson(this.courseId, lesson);
        }
      }
      this.snackBar.open('Урок опубликован!', 'ОК', {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'snack-success'
      });
    } catch (e) {
      console.error(e);
      this.snackBar.open('При публикации произошла ошибка', 'ОК', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'snack-error'
      });
    }

    this.showProgress = false;
  }
}
