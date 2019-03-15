import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
@Injectable()
export class AppFirebaseService {

  constructor(private fireDB: AngularFireDatabase, private fireAUTH: AngularFireAuth) { }

  signInGoogle(): Observable<any> {
    return Observable.create((obs) => {
      this.fireAUTH.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then(data => {
          obs.next(data);
        }).catch(err => {
          obs.error(err);
        });
    });
  }

  signInEmail(user: { email: string, password: string }): Observable<any> {
    return Observable.create((obs) => {
      this.fireAUTH.auth.signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
          obs.next(data);
        }).catch(err => {
          obs.error(err);
        });
    });

  }
}
