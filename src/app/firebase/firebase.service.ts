import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from 'store';
import { AppUser } from '../models/User';
import { tap } from 'rxjs/operators';
@Injectable()
export class AppFirebaseService {

  auth$ = this.fireAUTH.authState.pipe(
    tap(
      next => {
        if (!next) {
          this.store.set('user', null);
          return;
        }
        const user: AppUser = {
          email: next.email,
          uid: next.uid,
          authenticated: true
        };

        this.store.set('user', user);
      }
    ));

  get user() {
    return this.fireAUTH.auth.currentUser;
  }

  get authState() {
    return this.fireAUTH.authState;
  }


  constructor(private fireAUTH: AngularFireAuth, private store: Store) {
  }

  signInGoogle(): Observable<any> {
    return Observable.create((obs) => {
      try {
        this.fireAUTH.auth.signInWithPopup(new auth.GoogleAuthProvider())
          .then(data => {
            obs.next(data);
          }).catch(err => {
            obs.error(err);
          });
      } catch (e) {
        obs.error(e);
      }
    });
  }

  signInEmail(user: { email: string, password: string }): Observable<any> {
    return Observable.create((obs) => {
      try {
        this.fireAUTH.auth.signInWithEmailAndPassword(user.email, user.password)
          .then((data) => {
            obs.next(data);
          }).catch(err => {
            obs.error(err);
          });
      } catch (e) {
        obs.error(e);
      }
    });

  }

  registerWithEmail(user: { email: string, password: string }): Observable<any> {
    return Observable.create((obs) => {
      try {
        this.fireAUTH.auth.createUserWithEmailAndPassword(user.email, user.password)
          .then(val => obs.next(val))
          .catch(err => obs.error(err));
      } catch (e) {
        obs.error(e);
      }
    });

  }

  logout() {
    this.fireAUTH.auth.signOut();
  }
}
