import { Injectable } from '@angular/core';
import { Observable, from, of, empty } from 'rxjs';
import { Todo } from '../models/todo.model';
import { tap, map, take } from 'rxjs/operators';
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
        private appFactory: AppFactoryService, private appFirebase: AppFirebaseService) {
        this.setStorageInstance();
    }

    /**
     * Instance of app storage
     */
    setStorageInstance() {
        this.appStorage = this.appFactory.OfflineIndexDBStorage;
    }

    getListForGivenDate$(val: any, orderBy: string = 'date', showAll: boolean = true): Observable<any> {
        return this.appStorage.getListForGivenDate$(val, orderBy, showAll);
    }



    getListFromOnline(val: any, orderBy: string): Observable<Todo[]> {
        if (this.appFirebase.appStatus$.value === false) {
            return of([]);
        }
        return this.appFactory.OnlineFirebaseInstance.getListForGivenDate$(val, orderBy)
            .pipe(map(items => items), tap(items => {
                // retrieve all online todo items and store locally
                const items$ = items.map(item => this.appStorage.addTodo(item));
                from(items$).subscribe();
            }), take(1));
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

    syncDataOnline(callback) {
        this.appStorage.getAllTodo().pipe(
            map((items: Todo[]) => {
                let deleteItems = items.filter(v => v.isDeleted ? (v.isDeleted === true ? v : null) : null);
                const updateItems = items.filter(v => v.isUpdated ? (v.isUpdated === true ? v : null) : null);
                const addItems = items.filter(v => v.isNew ? (v.isNew === true ? v : null) : null);

                const onlineInstance = this.appFactory.OnlineFirebaseInstance;

                // Sync new item to online
                const addItems$ = addItems.map(item => {
                    // remove isNew and update online and to local storage
                    delete item.isNew;
                    item = { ...item };
                    return onlineInstance.addTodo(item).pipe(
                        tap(() => {
                            this.appStorage.updateTodo(item, item.key).subscribe();
                        }),
                        take(1));
                });

                const syncNewItemsObs =
                    addItems$.length > 0 ? from(addItems$).pipe(tap(a => a.subscribe())) : empty();

                // Sync updated item to online
                const updateItems$ = updateItems.map(item => {
                    delete item.isUpdated;
                    // remvove isUpdated property and update to local storage
                    item = { ...item };
                    return onlineInstance.updateTodo(item, item.key)
                        .pipe(
                            tap(() => {
                                this.appStorage.updateTodo(item, item.key).subscribe();
                            }),
                            take(1));
                });

                const syncUpdatedItemsObs =
                    updateItems$.length > 0 ? from(updateItems$).pipe(tap(a => a.subscribe())) : empty();

                // Sync deleted item to online

                const fileteredDeletedItem = deleteItems.filter(item => {
                    // if new item is added locally and without sync
                    // deleted locally then remove from local storage
                    // on sync without making a extra api call to server
                    // as record doesn't exist online
                    if (item.isDeleted === true && item.isNew !== undefined) {
                        this.appStorage.deleteTodo(item.key).subscribe();
                    }
                    return item.isDeleted === true && item.isNew === undefined;
                });

                deleteItems = [...fileteredDeletedItem];


                const deleteItems$ = deleteItems.map(item => onlineInstance.deleteTodo(item.key)
                    .pipe(
                        tap(() => {
                            console.log('online delete sync called ');
                            this.appStorage.deleteTodo(item.key).subscribe();
                        }),
                        take(1)
                    ));

                const syncDeletedItemsObs = deleteItems$.length > 0 ? from(deleteItems$).pipe(tap((a) => a.subscribe())) : empty();


                return of(syncNewItemsObs, syncUpdatedItemsObs, syncDeletedItemsObs);

            }),
            take(1)
        ).subscribe(done => {
            done.subscribe((inner) => inner.subscribe());
        },
            err => console.log(err),
            () => {
                if (this.appFirebase.appStatus$.value === true) {
                    this.appStorage.clearTodoItems().subscribe(() => { callback(); });
                } else {
                    callback();
                }
            });
    }
}
