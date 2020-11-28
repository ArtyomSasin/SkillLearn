import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = 'users';

  constructor(private firestore: AngularFirestore) { }

  public getUserSkillGroupsIds(userId: string): Observable<number[]> {
    return this.firestore.doc(`${this.users}/${userId}`).valueChanges().pipe(
      map<any, number[]>(user => user?.skillGroups ?? [])
    );
  }

  public updateUserSkillGroups(userId: string, skillGroupIds: number[]): Promise<void> {
    return this.firestore.doc(`${this.users}/${userId}`).update({ skillGroups: skillGroupIds });
  }

  /** Инициализация данных пользователя, после регистрации  */
  public createUserData(userId: string): Promise<void> {
    const ref = this.firestore.collection(this.users).doc(userId);
    return ref.get().toPromise().then(snap => {
      if (!snap.exists) {
        ref.set({ userId, skillGroups: [] });
      }
    });
  }
}
