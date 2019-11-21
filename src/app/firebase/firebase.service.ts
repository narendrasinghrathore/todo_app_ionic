import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store, AppStateProps } from 'store';
import { AppUser } from '../models/User';
import { tap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
@Injectable()
export class AppFirebaseService {
  uid$: BehaviorSubject<string> = new BehaviorSubject(null);

  appStatus$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  auth$ = this.fireAUTH.authState.pipe(
    tap(next => {
      if (!next) {
        this.store.set(AppStateProps.user, null);
        return;
      }
      const user: AppUser = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      };

      this.uid$.next(user.uid);

      this.store.set(AppStateProps.user, user);
    })
  );

  get user(): firebase.User {
    return this.fireAUTH.auth.currentUser;
  }

  get authState() {
    return this.fireAUTH.authState;
  }

  constructor(private fireAUTH: AngularFireAuth, private store: Store) {
    this.intiApp();
  }

  intiApp() {
    const connectedRef = firebase.database().ref('.info/connected');
    connectedRef.on('value', snap => {
      if (snap.val() === true) {
        this.appStatus$.next(true);
      } else {
        this.appStatus$.next(false);
      }
    });
  }

  signInGoogle(): Observable<any> {
    return Observable.create(obs => {
      try {
        this.fireAUTH.auth
          .signInWithPopup(new auth.GoogleAuthProvider())
          .then(data => {
            obs.next(data);
          })
          .catch(err => {
            obs.error(err);
          });
      } catch (e) {
        obs.error(e);
      }
    });
  }

  signInEmail(user: { email: string; password: string }): Observable<any> {
    return new Observable(obs => {
      try {
        this.fireAUTH.auth
          .signInWithEmailAndPassword(user.email, user.password)
          .then((data: any) => {
            const { email, phoneNumber, uid } = data['user'];
            const newData = { email, phoneNumber, uid };
            obs.next(newData);
          })
          .catch(err => {
            obs.error(err);
          });
      } catch (e) {
        obs.error(e);
      }
    });
  }

  registerWithEmail(user: {
    email: string;
    password: string;
  }): Observable<any> {
    return Observable.create(obs => {
      try {
        this.fireAUTH.auth
          .createUserWithEmailAndPassword(user.email, user.password)
          .then(val => {
            obs.next(val);
          })
          .catch(err => obs.error(err));
      } catch (e) {
        obs.error(e);
      }
    });
  }

  logout() {
    this.fireAUTH.auth.signOut();
    this.uid$.next(null);
  }
}
