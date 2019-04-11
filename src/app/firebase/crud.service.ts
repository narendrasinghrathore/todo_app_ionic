import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { tap } from 'rxjs/operators';
import { Store, AppStateProps } from 'store';
import { AppFactoryService } from './factory.service';
import { AppOnlineStorageService } from './online-storage.service';
import { AppOfflineStorageService, DatabaseEvent } from './offline-storage.service';
@Injectable()
export class AppFirebaseCRUDService {

    offlineDatabaseEvent = this.appStorage.dbChanges;

    todoList$(): Observable<Todo[]> {
        return this.appStorage.getAllTodo().pipe(
            tap(next => this.store.set(AppStateProps.todos, next))
        );
    }

    constructor(private appStorage: AppOfflineStorageService,
        private store: Store,
        private appFactory: AppFactoryService) {
        this.setStorageInstance();
    }

    /**
     * Instance of app storage
     */
    setStorageInstance() {
        this.appStorage = this.appFactory.OfflineIndexDBStorage;
    }

    getListForGivenDate$(val: any, orderBy: string = 'date'): Observable<Todo[]> {
        return this.appStorage.getListForGivenDate$(val, orderBy).pipe(
            // tap((next) => {
            //     console.log(next)
            //     this.store.set(AppStateProps.filteredTodos, next);
            // })
            );
    }



    addTodo(item: Todo) {
        const todo = { ...item };
        todo.timestamp = new Date().getTime();
        todo.date = new Date().toDateString();
        todo.key = todo.timestamp.toString();
        return this.appStorage.addTodo(todo);
    }

    updateTodo(item: Todo, key: string) {
        return this.appStorage.updateTodo(item, key);
    }

    deleteTodo(key: string) {
        return this.appStorage.deleteTodo(key);
    }
}
