import { IAppStorage } from './storage.interface';
import { Todo } from '../models/todo.model';
import { Observable } from 'rxjs';
/**
 * Interface to implement for offline storage service i.e IndexDB, LocalStorage etc
 */
export interface IAppStorageOffline extends IAppStorage {

    /**
    * Return total number of items stored in IndexDB
    */
    totalItems: Observable<number>;
    /**
   * Add todo item to IndexDB when offline and return a observable on successfull item added.
   * @param item : Todo
   */
    addTodo(item: Todo): Observable<any>;

    /**
     * Get all todo items from IndexDB
     */
    getAllTodo(url?: string): Observable<any>;

    /**
     * Clear all items from IndexDB
     */
    clearTodoItems(): Observable<any>;
}
