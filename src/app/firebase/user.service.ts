import { Injectable } from '@angular/core';
import { AppFirebaseService } from './firebase.service';
import { FirebaseUser, AppUserData } from '../models/firebase.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store } from 'store';


@Injectable()
export class AppFirebaseUserService {

    userTableName = 'userProfileData';

    uid = this.fire.uid$.value;

    get url() {
        const v = `${this.userTableName}/${this.fire.uid$.value}`;
        return v;
    }

    userData$(url): Observable<AppUserData[]> {
        return this.fireDB.list(url)
            .snapshotChanges()
            .pipe(
                map(changes => changes.map(
                    c => ({ key: c.payload.key, ...c.payload.val() })
                )),
                tap((next) => this.store.set('userProfileData', next))
            );
    }

    constructor(private fire: AppFirebaseService,
        private fireDB: AngularFireDatabase,
        private store: Store) {

    }

    get user() {
        return this.fire.user;
    }

    addUserProfile(user_: AppUserData) {
        const user = { ...user_ };
        user.timestamp = new Date().getTime();
        return this.fireDB.list(`${this.userTableName}/${this.uid}`).push(user);
    }

    updateTodo_(user: AppUserData, key: string) {
        return this.fireDB.object(`${this.userTableName}/${this.uid}/${key}`).update(user);
    }


    async updateUser(user: FirebaseUser): Promise<boolean> {
        await this.fire.user.updateProfile(user);
        return true;
    }
}
