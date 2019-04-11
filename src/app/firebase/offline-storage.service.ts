import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Todo } from '../models/todo.model';
import { Observable, from, Subject, defer, of } from 'rxjs';
import { IAppStorageOffline } from './storageOffline.interface';
import { Store, AppStateProps } from 'store';
import { tap, map, flatMap, switchMap } from 'rxjs/operators';

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

  getListForGivenDate$(val: any, orderBy: string): Observable<Todo[]> | Observable<any> | any {

    return of([]).pipe(switchMap(() => from(this.storage.keys()).pipe(
      map(k => new Promise(async (resolve, reject) => {
        const arr: Todo[] = [];
        const keys = await this.storage.keys();
        for (const key of keys) {
          const item = await this.storage.get(key);
          if (item[orderBy] === val) {
            arr.push(item);
          }
        }
        resolve(arr);
      }),
      ),
      tap(
        arr => arr.then(a => this.store.set(AppStateProps.filteredTodos, a))
      )
    )));
  }

  updateTodo(item: Todo, key: string): Observable<any> | Promise<void> {
    this.dbChanges.next(DatabaseEvent.Update);
    return from(this.storage.set(key, item));
  }

  deleteTodo(key: string): Observable<any> | Promise<void> {
    this.dbChanges.next(DatabaseEvent.Delete);
    return from(this.storage.remove(key));
  }

  constructor(private storage: Storage, private store: Store) { }

  /**
   * Add todo item to IndexDB when offline and return a observable on successfull item added.
   * @param item : Todo
   */
  addTodo(item: Todo): Observable<any> {
    this.dbChanges.next(DatabaseEvent.Add);
    return from(this.storage.set(JSON.stringify(item.timestamp), item));
  }

  /**
   * Get all todo items from IndexDB
   */
  getAllTodo(): Observable<any> {
    return from(this.storage.forEach((val) => val));
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
