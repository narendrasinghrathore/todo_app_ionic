import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { tap } from 'rxjs/operators';
import { Store, AppStateProps } from 'store';
import { AppFactoryService } from './factory.service';
import { AppOfflineStorageService } from './offline-storage.service';
import { AppFirebaseService } from './firebase.service';
import { CoreService } from '../core/core.service';
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
        private appFactory: AppFactoryService, appFirebase: AppFirebaseService,
        private coreService: CoreService) {
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

    restoreTodoDeleted(item: Todo) {
        delete item.isDeleted;
        if (item.isNew === false && item.isNew !== undefined) {
            item = { ...item, isNew: true };
        }
        this.updateTodo(item, item.key);
    }

    updateTodo(item: Todo, key: string) {
        // We will remove isNew property of item when item sync to online
        // so on next online sync we just have to set isUpdate or isDelete
        if (!item.isNew) {
            /// If item is newly added and haven't sync with online server,
            // in that case just update the existing
            // one with no extra flag. Helpful when we loop through array and find if item
            // item is new or a update to already created and sync item.
            // Adding new item and updating it and also adding flag isUpdated will make extra
            // items to sync.
            // Scenario: As same item will be in addNew array and also updateItemsArray to sync online,
            // if we add isNew and also isUpdated to same item.
            item = { ...item, isUpdated: true };
        }
        return this.appStorage.updateTodo(item, key);
    }

    /**
     * Mark as delete to later sync with online server to remove it from there.
     * @param key Todo item key
     * @param item Todo item
     */
    deleteTodo(key: string, item?: Todo) {
        if (item.isNew) {
            item = { ...item, isNew: false };
        }
        if (item.isUpdated) {
            delete item.isUpdated;
            item = { ...item };
        }
        item = { ...item, isDeleted: true };
        return this.appStorage.updateTodo(item, key);
    }

    syncDataOnline() {
        this.appStorage.getAllTodo().subscribe((items: Todo[]) => {
            const deleteItems = items.filter(v => v.isDeleted ? (v.isDeleted === true ? v : null) : null);
            const updateItems = items.filter(v => v.isUpdated ? (v.isUpdated === true ? v : null) : null);
            const addItems = items.filter(v => v.isNew ? (v.isNew === true ? v : null) : null);

            const onlineInstance = this.appFactory.OnlineFirebaseInstance;

            // Sync new created items to online
            for (const newItem of addItems) {
                onlineInstance.addTodo(newItem).subscribe(d => {
                    delete newItem.isNew;
                    // remove isNew and update to local storage
                    const item = { ...newItem };
                    this.appStorage.updateTodo(item, item.key);
                });
            }

            // Sync updated item to online
            for (const updateItem of updateItems) {
                onlineInstance.updateTodo(updateItem, updateItem.key).subscribe(d => {
                    delete updateItem.isUpdated;
                    // remvove isUpdated property and update to local storage
                    const item = { ...updateItem };
                    this.appStorage.updateTodo(item, item.key);
                });
            }

            // Sync deleted item to online
            for (const deletedItem of deleteItems) {
                onlineInstance.deleteTodo(deletedItem.key).subscribe(d => {
                    // remove from local storage
                    this.appStorage.deleteTodo(deletedItem.key);
                });
            }
        });
    }
}
