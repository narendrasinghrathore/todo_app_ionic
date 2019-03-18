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
    user = this.fireService.user;

    todoList$: Observable<any[]> = this.fireDB.list(`${this.tableName}/${this.user['uid']}`)
        .snapshotChanges()
        .pipe(
            map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })
            ))
            , tap((next) => this.store.set('todos', next)
            ));

    constructor(private fireDB: AngularFireDatabase,
        private fireService: AppFirebaseService, private store: Store) {

    }



    addTodo(item: Todo) {
        const todo = {...item};
        todo.timestamp = new Date().getTime();
        return this.fireDB.list(`${this.tableName}/${this.user['uid']}`).push(todo);
    }

    updateTodo(item: Todo, key: string) {
        return this.fireDB.object(`${this.tableName}/${this.user['uid']}/${key}`).update(item);
    }

    deleteTodo(key: string) {
        return this.fireDB.list(`${this.tableName}/${this.user['uid']}`).remove(key);
    }
}