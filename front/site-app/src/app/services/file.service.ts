import { Injectable } from '@angular/core';
import {
  AngularFireStorage, AngularFireUploadTask,
} from '@angular/fire/storage';
import { from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private storage: AngularFireStorage) { }

  public async isExists(filePath: string): Promise<any> {
    try {
      console.log('isExists() filePath: ', filePath);
      await this.storage.ref(filePath).getMetadata().toPromise();
      const path = await this.storage.ref(filePath).getDownloadURL().toPromise();
      return { exists: true, path };
    }
    catch (e) {
      const code = e?.code;
      if (code === 'storage/object-not-found') {
        return { exists: false, path: null };
      }
      throw e;
    }
  }

  public upload(file: File, folder: string): FilesUploadMetadata {
    const { name } = file;
    const filePath = `${folder}/${name}`;
    console.log('upload() file: ', file, 'folder: ', folder);
    const uploadTask: AngularFireUploadTask = this.storage.upload(filePath, file);
    return {
      progress$: uploadTask.percentageChanges(),
      url$: this.getDownloadUrl$(uploadTask, filePath),
    };
  }

  private getDownloadUrl$(
    uploadTask: AngularFireUploadTask,
    path: string,
  ): Observable<string> {
    return from(uploadTask).pipe(
      switchMap((_) => this.storage.ref(path).getDownloadURL()),
    );
  }
}

export interface FilesUploadMetadata {
  progress$: Observable<number | undefined | null>;
  url$: Observable<string>;
}
