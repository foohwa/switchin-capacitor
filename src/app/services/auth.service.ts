import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';
import { Storage } from '@capacitor/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);

  constructor(
    private firebaseAuth: AngularFireAuth,
    private httpClient: HttpClient
  ) {}

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get token() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  autoLogin() {
    return from(Storage.get({ key: 'uid' })).pipe(
      map((storedData) => {
        if (!storedData || !storedData.value) {
          return null;
        }
        return new User(storedData.value);
      }),
      tap((user) => {
        if (user) {
          this._user.next(user);
        }
      }),
      map((user) => {
        return !!user;
      })
    );
  }

  loginUser(
    email: string = 'arthurfoo10@gmail.com',
    password: string = 'Voofohjin12#'
  ) {
    return from(
      this.firebaseAuth.signInWithEmailAndPassword(email, password)
    ).pipe(
      tap(({ user }) => {
        this.setUserData(user.uid);
      })
    );
  }

  registerUser() {
    // const { email, password } = {
    //   email: 'arthurfoo10@gmail.com',
    //   password: 'Voofohjin12#',
    // };
    // from(
    //   this.firebaseAuth.createUserWithEmailAndPassword(email, password)
    // ).subscribe(
    //   (user) => {
    //     this.userCredential$.next(JSON.stringify(user.user.uid));
    //   },
    //   (error) => {
    //     this.loginInfo = error;
    //   }
    // );
  }

  logout() {
    return from(this.firebaseAuth.signOut()).pipe(
      tap(() => {
        this._user.next(null);
        Storage.remove({ key: 'uid' });
      })
    );
  }

  private setUserData(uid: string) {
    const user = new User(uid);
    this._user.next(user);
    this.storeAuthData(uid);
  }

  private storeAuthData(uid: string) {
    Storage.set({ key: 'uid', value: uid });
  }
}
