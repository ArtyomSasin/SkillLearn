import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Author } from '../shared/models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private authors = 'authors';

  constructor(private firestore: AngularFirestore) { }

  /** Получение информации об авторе */
  public getAuthor(userId: string): Promise<Author> {
    console.log('getAuthor() usesrId: ', userId);
    return this.firestore.collection(this.authors).doc(userId).get()
      .pipe(map(value => value.data() as Author))
      .toPromise();
  }

  public async isAuthor(userId: string): Promise<boolean> {
    console.log('isAuthor() usesrId: ', userId);
    const author = await this.getAuthor(userId);
    if (author && author.id === userId) {
      return true;
    }
    return false;
  }

  /** Создание автора  */
  public createAuthor(userId: string, name: string): Promise<void> {
    console.log('createAuthor() userId: ', userId);
    const ref = this.firestore.collection(this.authors).doc(userId);
    return ref.get().toPromise().then(async snap => {
      if (!snap.exists) {
        await ref.set({ id: userId, name });
      }
    });
  }
}
