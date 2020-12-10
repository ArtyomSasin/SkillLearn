import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { Lesson, LessonTypes } from 'src/app/shared/models/lesson';
import { HtmlDialogComponent } from '../../dialogs/html-dialog/html-dialog.component';
import { TextEditorComponent } from '../../text-editor/text-editor.component';

@Component({
  selector: 'app-edit-lesson',
  templateUrl: './edit-lesson.component.html',
  styleUrls: ['./edit-lesson.component.css']
})
export class EditLessonComponent implements OnInit {

  @ViewChild('contentEditor') editorRef?: any;
  courseId: any;
  lessonId: any;
  /** Количество уроков */
  maxOrder = 0;

  showProgress = true;
  lessonTypes = LessonTypes;
  userId: string | null = null;
  content = '';
  form: FormGroup = this.fb.group(
    {
      id: new FormControl(null),
      authorId: new FormControl(null),
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      order: new FormControl(null),
      type: new FormControl(null),
    }
  );

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private courseService: CourseService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.showProgress = true;
      console.log(params);
      const user = await this.authService.getCurrentUser();
      this.userId = user?.uid ?? null;
      this.courseId = params.courseId;
      this.lessonId = params.lessonId;

      // Получаем информацию о курсе и уроках
      const course = await this.courseService.getCourse(this.courseId, true);
      console.log('course: ', course);

      // Вычисляем максимальный порядковый номер статей
      if (course.lessons && course.lessons?.length > 0) {
        this.maxOrder = Math.max(...course.lessons.map(l => l.order));
      } else {
        this.maxOrder = 0;
      }

      // Если передан lessonId, получаем информацию о нем
      if (this.lessonId) {
        const lesson = await this.courseService.getLesson(this.lessonId, true);
        this.form.patchValue(lesson);
        this.content = lesson.content;
      } else {
        this.form.patchValue({ id: null, authorId: this.userId, title: '', description: '', type: LessonTypes.theory, order: 0 });
        this.content = '';
      }

      this.showProgress = false;
    });
  }

  /** Показать превью урока */
  showPreview(): void {
    const content = this.getEditorContent();
    this.dialog.open(HtmlDialogComponent, {
      data: content
    });
  }

  getEditorContent(): string {
    return this.editorRef?.content;
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
      lesson.content = this.getEditorContent();
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
