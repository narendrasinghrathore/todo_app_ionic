import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Todo } from '../models/todo.model';
import { Observable, from, Subject, of } from 'rxjs';
import { IAppStorageOffline } from './storageOffline.interface';
import { Store, AppStateProps } from 'store';
import { tap, switchMap, mergeMap, map, take } from 'rxjs/operators';

export enum DatabaseEvent {
  Add = 0,
  Update = 1,
  Delete = 2,
  Clear = 3
}

@Injectable({
  providedIn: 'root'
})
export class AppOfflineStorageService implements IAppStorageOffline {
  /**
   * Emit event when db changes made i.e add, update, delete
   */
  dbChanges: Subject<DatabaseEvent> = new Subject();

  getListForGivenDate$(val: any, orderBy: string, showAll: boolean = true): Observable<Todo[]> | Observable<any> | any {
    return of(this.storage.keys())
      .pipe(
        mergeMap(d => d),
        switchMap((k) => of(k).pipe(mergeMap(async (keys) => {
          const arr: Todo[] = [];
          for (const key of keys) {
            const item: Todo = await this.storage.get(key);
            if (item[orderBy] === val) {
              if (showAll === false) {
                if (item.isDeleted === undefined) {
                  arr.push(item);
                }
              } else {
                arr.push(item);
              }
            }
          }
          return arr;
        }))),
        tap(
          arr => {
            let tempArr = [];
            if (arr) {
              tempArr = [...arr];
            }
            this.store.set(AppStateProps.filteredTodos, tempArr);

          }),
          take(1)
      );
  }

  updateTodo(item: Todo, key: string): Observable<any> | Promise<void> | any {
    this.dbChanges.next(DatabaseEvent.Update);
    return from(this.storage.set(key, item)).pipe(take(1));
  }

  deleteTodo(key: string): Observable<any> | Promise<void> | any {
    return from(this.storage.remove(key))
      .pipe(
        tap(() => this.dbChanges.next(DatabaseEvent.Delete)),
        take(1)
      );
  }

  constructor(private storage: Storage, private store: Store) { }

  /**
   * Add todo item to IndexDB when offline and return a observable on successfull item added.
   * @param item : Todo
   */
  addTodo(item: Todo): Observable<any> | Promise<any> | any {
    return from(this.storage.set(JSON.stringify(item.timestamp), item))
      .pipe(
        tap(() => this.dbChanges.next(DatabaseEvent.Add)),
        take(1)
      );
  }

  /**
   * Get all todo items from IndexDB
   */
  getAllTodo(): Observable<Todo[]> {
    return of([]).pipe(
      switchMap(() => from(this.storage.keys())
        .pipe(mergeMap(async (val) => {
          const arr: Todo[] = [];
          for (const v of val) {
            const item: Todo = await this.storage.get(v);
            arr.push(item);
          }
          return arr;
        })
        )));
  }

  /**
   * Return total number of items stored in IndexDB
   */
  get totalItems(): Observable<number> {
    return from(this.storage.length());
  }

  /**
   * Clear all items from IndexDB
   */
  clearTodoItems(): Observable<any> {
    this.dbChanges.next(DatabaseEvent.Clear);
    return from(this.storage.clear());
  }

}
