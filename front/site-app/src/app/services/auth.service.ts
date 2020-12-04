import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { UserService } from './user.service';

const _PERSISTENCE = firebase.auth.Auth.Persistence.LOCAL;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: firebase.User | null = null;

  onAuthUserSuccess = new EventEmitter<boolean>();

  constructor(
    private afAuth: AngularFireAuth,
    private userService: UserService,
  ) {
    // Подписываемся на onAuthStateChanged
    firebase.auth().onAuthStateChanged(async user => {
      this.currentUser = user;
      try {
        // если это новый пользователь - осуществляем анонимный вход
        if (!user) {
          this.onAuthUserSuccess?.emit(false);
          await this.loginAnonymous();
        }
        else {
          this.onAuthUserSuccess?.emit(true);
        }
      } catch (e) {
        console.error('error: ', e);
      }
      return user;
    });
  }

  /** Получение текщуего пользователя */
  public get user(): firebase.User | null {
    return this.currentUser ?? firebase.auth().currentUser;
  }

  async getCurrentUser(): Promise<firebase.User | null> {
    return new Promise((resolve, reject) => {
      if (this.user) {
        console.log('user from cache: ', this.user);
        resolve(this.user);
        return;
      }
      const unsubscribe = firebase.auth().onAuthStateChanged(async user => {
        unsubscribe();
        if (!user) {
          await this.loginAnonymous();
          user = firebase.auth().currentUser;
        }
        resolve(user);
      }, reject);
    });
  }

  /** Вход по электронной почте */
  public async loginByEmail(email: string, password: string): Promise<any> {
    const user = this.user;
    await firebase.auth().setPersistence(_PERSISTENCE);
    return await firebase.auth().signInWithEmailAndPassword(email, password).then(async credentail => {
      if (user?.isAnonymous) {
        // удаляем анонимного пользователя
        await user.delete();
      }
      return credentail;
    });
  }

  /** Проверка залогиненности пользователя (анонимный пользователь не считается залогиненым) */
  public isLoggedIn(): boolean {
    return this.user != null
      ? (this.user.isAnonymous ? false : true)
      : false;
  }

  /** Регистрирует учетную запись пользователя по email и password */
  public registerByEmail(email: string, password: string): Promise<any> {
    const anonymous = this.user;
    const credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return firebase.auth().setPersistence(_PERSISTENCE).then(async persist => await this.linkWithCredentail(anonymous, credential));
  }

  /** Осуществляет вход с помощью учетной записи google */
  public googleLogin(): Promise<any> {
    const anonymous = this.user;

    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    return firebase.auth().setPersistence(_PERSISTENCE).then(async persist => await this.afAuth.signInWithPopup(provider)
      .then(async res => await this.linkWithCredentail(anonymous, res?.credential)));
  }

  /** Выход из учетной записи */
  public logOut(): Promise<void> {
    return this.afAuth.signOut();
  }


  /** Анонимный вход */
  private loginAnonymous(): Promise<any> {
    return firebase.auth().setPersistence(_PERSISTENCE).then(async persist =>
      await firebase.auth().signInAnonymously()
        .then((userCredential) => console.log('userCredential: ', userCredential))
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/operation-not-allowed') {
            alert('You must enable Anonymous auth in the Firebase Console.');
          } else {
            console.error(error);
          }
        })
    );
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
      return anonymousUser?.linkWithCredential(credential)
        .then(async usercred => {
          console.log('Anonymous account successfully upgraded', usercred.user);
          if (usercred.user?.uid) {
            console.log('createUserData');
            await this.userService.createUserData(usercred.user?.uid);
          }
          resolve(usercred);
        }).catch(error => {
          console.error('Error upgrading anonymous account', error);
          reject(error);
        });
    });
  }
}
