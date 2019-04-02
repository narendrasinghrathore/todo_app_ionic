import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { AppFirebaseService } from './firebase.service';
import { map, tap } from 'rxjs/operators';
import { Store } from 'store';
@Injectable()
export class AppFirebaseCRUDService {

    tableName = 'todos';

    uid = this.fireService.uid$.value;

    get url() {
        return `${this.tableName}/${this.fireService.uid$.value}`;
    }

    todoList$(url): Observable<Todo[]> {
        return this.fireDB.list(url)
            .snapshotChanges()
            .pipe(
                map(changes => changes.map(
                    c => ({ key: c.payload.key, ...c.payload.val() })
                ))
                , tap((next) => {

                    this.store.set('todos', next);
                }
                ));
    }

    constructor(private fireDB: AngularFireDatabase,
        private fireService: AppFirebaseService, private store: Store) {
    }



    addTodo(item: Todo) {
        const todo = { ...item };
        todo.timestamp = new Date().getTime();
        todo.date = new Date().toDateString();
        return this.fireDB.list(`${this.tableName}/${this.uid}`).push(todo);
    }

    updateTodo(item: Todo, key: string) {
        return this.fireDB.object(`${this.tableName}/${this.uid}/${key}`).update(item);
    }

    deleteTodo(key: string) {
        return this.fireDB.list(`${this.tableName}/${this.uid}`).remove(key);
    }
}
