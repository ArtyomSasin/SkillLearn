import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  get user(): firebase.User | null {
    return firebase.auth().currentUser;
  }

  /** Анонимный вход */
  loginAnonymous(): Promise<any> {
    return firebase.auth().signInAnonymously()
      .then((userCredential) => console.log('userCredential: ', userCredential))
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/operation-not-allowed') {
          alert('You must enable Anonymous auth in the Firebase Console.');
        } else {
          console.error(error);
        }
      });
  }

  /** Вход по электронной почте */
  loginByEmail(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  /** Проверка залогиненности пользователя (анонимный пользователь не считается залогиненым) */
  isLoggedIn(): boolean {
    return this.user != null
      ? (this.user.isAnonymous ? false : true)
      : false;
  }

  /** Регистрирует учетную запись пользователя по email и password */
  registerByEmail(email: string, password: string): Promise<any> {
    const anonymous = this.user;
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return this.linkWithCredentail(anonymous, credential);
  }

  /** Осуществляет вход с помощью учетной записи google */
  googleLogin(): Promise<any> {
    const anonymous = this.user;

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    return this.afAuth.signInWithPopup(provider)
      .then(res => this.linkWithCredentail(anonymous, res?.credential));
  }


  logOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  /** Связывает анонимного пользователя anonymousUser с учетными данными credential */
  private linkWithCredentail(anonymousUser: firebase.User | null, credential: firebase.auth.AuthCredential | null): Promise<any> {
    if (!anonymousUser) {
      throw new Error('anonymousUser can not be null');
    }
    if (!credential) {
      throw new Error('credential can not be null');
    }
    return new Promise<any>((resolve, reject) => {
      anonymousUser?.linkWithCredential(credential)
        .then(usercred => {
          console.log('Anonymous account successfully upgraded', usercred.user);
          resolve(usercred);
        }).catch(error => {
          console.error('Error upgrading anonymous account', error);
          reject(error);
        });
    });
  }
}
