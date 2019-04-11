import { IAppStorage } from './storage.interface';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
/**
 * Interface to implement online CRUD for
 * Firebase Realtime Database
 */
export interface IAppStorageOnline extends IAppStorage {
    /**
     * Return Promise<Todo[]> | Observable<Todo[]> | any
     * @param val: Todo propertry value to compare with
     * @param orderBy: Todo propertry to compare with
     */
    getListForGivenDate$(val: any, orderBy: string, config?: any): Promise<Todo[]> | Observable<Todo[]> | any;
    /**
     * Promise<Todo[]> | Observable<Todo[]> | any
     * @param item: Todo
     */
    addTodo(item: Todo, config?: any): Promise<any> | Observable<any> | any;
    /**
     * Promise<Todo[]> | Observable<Todo[]> | any
     * @param item: Todo
     * @param key: Todo property key
     */
    updateTodo(item: Todo, key: string, config?: any): Promise<any> | Observable<any> | any;
    /**
     * Promise<Todo[]> | Observable<Todo[]> | any
     * @param key: Todo property i.e key
     */
    deleteTodo(key: string, config?: any): Promise<any> | Observable<any> | any;
}
