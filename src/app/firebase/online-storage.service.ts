import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, from } from 'rxjs';
import { Todo } from '../models/todo.model';
import { AppFirebaseService } from './firebase.service';
import { map, tap, mergeMap, take } from 'rxjs/operators';
import { Store, AppStateProps } from 'store';
import { IAppStorageOnline } from './storageOnline.interface';

@Injectable({
    providedIn: 'root'
})
export class AppOnlineStorageService implements IAppStorageOnline {

    tableName = 'todos';

    dbRef = this.fireDB.database.ref(this.url);

    get url() {
        return `${this.tableName}/${this.fireService.uid$.value}`;
    }

    getAllTodo(): Observable<Todo[]> {
        return this.fireDB.list(this.url)
            .snapshotChanges();
    }

    constructor(private fireDB: AngularFireDatabase,
        private fireService: AppFirebaseService, private store: Store) {
    }

    getListForGivenDate$(val: any, orderBy: string = 'date'): Observable<Todo[]> {
        return this.fireDB.list(this.url,
            (a) => a.orderByChild(orderBy).startAt(val).endAt(val)).snapshotChanges()
            .pipe(map(changes => changes.map(
                c => ({ key: c.payload.key, ...c.payload.val() })
            ))
                , tap((next) => {
                    this.store.set(AppStateProps.filteredTodos, next);
                }));
    }



    /**
     * Return Observable using from operator to resolve promise and mergeMap
     * to flatten the inner promise and take will automatically
     * unsubscribe after getting the first value
     * @param item Todo
     */
    addTodo(item: Todo) {
        return from(this.dbRef.child(`${item.timestamp.toString()}`).set(item))
            .pipe(take(1));
    }

    updateTodo(item: Todo, key: string) {
        return from(this.dbRef.child(key).update(item))
            .pipe(take(1));
    }

    deleteTodo(key: string) {
        return from(this.dbRef.child(key).remove())
            .pipe(take(1));
    }
}
