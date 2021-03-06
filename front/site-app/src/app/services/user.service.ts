import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = 'users';

  constructor(private firestore: AngularFirestore) { }

  public getUserSkillGroupsIds(userId: string): Promise<string[]> {
    return this.firestore.collection(this.users).doc(userId).get()
      .pipe(
        map<any, string[]>(user => {
          return user.data()?.skillGroupIds ?? [];
        })
      ).toPromise();
  }

  public updateUserSkillGroups(userId: string, skillGroupIds: string[]): Promise<void> {
    return this.firestore.collection(this.users).doc(userId).update({ skillGroupIds });
  }

  /** Инициализация данных пользователя, после регистрации  */
  public createUserData(userId: string): Promise<void> {
    const ref = this.firestore.collection(this.users).doc(userId);
    return ref.get().toPromise().then(snap => {
      if (!snap.exists) {
        ref.set({ userId, skillGroupIds: [] });
      }
    });
  }
}
