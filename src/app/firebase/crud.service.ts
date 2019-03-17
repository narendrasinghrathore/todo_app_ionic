import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { AppFirebaseService } from './firebase.service';
import { map, tap } from 'rxjs/operators';
import { Store } from 'store';
@Injectable()
export class AppFirebaseCRUDService {

    tableName = 'todo-list';
    uid = this.fireService.user.uid;

    todoList$: Observable<any[]> = this.fireDB.list(`${this.tableName}/${this.uid}`)
        .snapshotChanges()
        .pipe(
            map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })
            ))
            , tap((next) => this.store.set('todos', next)
            ));

    constructor(private fireDB: AngularFireDatabase,
        private fireService: AppFirebaseService, private store: Store) { }



    addTodo(item: Todo) {
        return this.fireDB.list(`${this.tableName}/${this.uid}`).push(item);
    }

    updateTodo(item: Todo, key: string) {
        return this.fireDB.object(`${this.tableName}/${this.uid}/${key}`).update(item);
    }

    deleteTodo(key: string) {
        return this.fireDB.list(`${this.tableName}/${this.uid}`).remove(key);
    }
}
