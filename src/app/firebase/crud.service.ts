import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { tap } from 'rxjs/operators';
import { Store, AppStateProps } from 'store';
import { AppFactoryService } from './factory.service';
import { AppOfflineStorageService } from './offline-storage.service';
import { AppFirebaseService } from './firebase.service';
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
        private appFactory: AppFactoryService, appFirebase: AppFirebaseService) {
        this.setStorageInstance();

        appFirebase.appStatus$.subscribe(appOnline => {
            if (appOnline) {
                this.syncDataOnline();
            }
        });


    }

    /**
     * Instance of app storage
     */
    setStorageInstance() {
        this.appStorage = this.appFactory.OfflineIndexDBStorage;
    }

    getListForGivenDate$(val: any, orderBy: string = 'date', showAll: boolean = true): Observable<Todo[]> {
        return this.appStorage.getListForGivenDate$(val, orderBy, showAll);
    }



    addTodo(item: Todo) {
        const todo = { ...item };
        todo.timestamp = new Date().getTime();
        todo.date = new Date().toDateString();
        todo.key = todo.timestamp.toString();
        todo.isNew = true;
        return this.appStorage.addTodo(todo);
    }

    updateTodo(item: Todo, key: string) {
        item = { ...item, isUpdated: true };
        return this.appStorage.updateTodo(item, key);
    }

    /**
     * Mark as delete to later sync with online server to remove it from there.
     * @param key Todo item key
     * @param item Todo item
     */
    deleteTodo(key: string, item?: Todo) {
        item = {...item, isDeleted: true};
        return this.appStorage.updateTodo(item, key);
    }

    syncDataOnline() {
        this.appStorage.getAllTodo().subscribe((item: any) => {

        });
    }
}
