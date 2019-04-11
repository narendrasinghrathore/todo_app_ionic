import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { AppFirebaseService } from './firebase.service';
import { map, tap } from 'rxjs/operators';
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



    addTodo(item: Todo) {
        return this.dbRef.child(`${item.timestamp.toString()}`).set(item);
    }

    updateTodo(item: Todo, key: string) {
        return this.dbRef.child(key).update(item);
    }

    deleteTodo(key: string) {
        return this.dbRef.child(key).remove();
    }
}
