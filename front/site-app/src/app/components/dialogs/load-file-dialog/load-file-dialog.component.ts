import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FilesUploadMetadata } from 'src/app/services/file.service';

@Component({
  selector: 'app-load-file-dialog',
  templateUrl: './load-file-dialog.component.html',
  styleUrls: ['./load-file-dialog.component.css']
})
export class LoadFileDialogComponent implements OnInit, OnDestroy {
  destroy$: Subject<null> = new Subject();
  private file: File | null = null;
  isImage = false;

  error: string | null = null;
  /** Показывать прогресс  */
  isShowProgress = false;
  /** Процент прогреса */
  progress$: Observable<number | null | undefined> | null = null;

  /** Буфер для превью */
  buffer: string | ArrayBuffer | null = null;


  constructor(
    public dialogRef: MatDialogRef<LoadFileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ILoadFileModel
  ) {
    this.configureData();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  private configureData(): void {
    const image = this.data?.fileTypes?.find(t => t.startsWith('image'));
    this.isImage = image ? true : false;
  }

  get types(): string {
    return this.data?.fileTypes?.join(', ') ?? null;
  }

  selectFile(files: FileList | null): void {
    console.log(files);
    if (files && files.length > 0) {
      const file = files.item(0);
      this.file = file;
      this.preview(file);
    }
  }

  preview(file: File | null): void {
    if (!file) {
      return;
    }

    const mimeType = file.type;
    if (!mimeType.startsWith('image')) {
      this.error = 'Данный тип файла не поддерживает предпросмотр';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.buffer = reader.result;
    };
  }

  async success(): Promise<void> {
    if (!this.file && !this.data.currentFile) {
      this.error = 'Выберите файл';
      return;
    }
    if (this.file) {
      // Проверяем существует ли файл
      const exists = await this.data.exists(this.file);
      if (exists.exists === true) {
        this.dialogRef.close(exists.path);
        return;
      }
      // Загруаем на сервер
      const meta = this.data.upload(this.file);
      this.progress$ = meta.progress$;
      this.isShowProgress = true;
      console.log('meta: ', meta);

      meta.url$.pipe(
        takeUntil(this.destroy$),
      )
        .subscribe(url => {
          this.isShowProgress = false;
          // Закрываем диалог
          this.dialogRef.close(url);
        }, (e) => {
          console.error('Ошибка при загрузке файла: ', e);
          this.error = 'При загрузке файла произошла ошибка. Попробуйте еще раз';
          return;
        });
    } else {
      // Закрываем диалог
      this.dialogRef.close(this.data.currentFile);
    }
  }
}

export interface ILoadFileModel {
  title: string;
  fileTypes: string[];
  currentFile: string;
  upload(file: File): FilesUploadMetadata;
  exists(file: File): any;
}
