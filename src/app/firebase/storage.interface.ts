import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
/**
 * Interface to implmenet storage mechanism for app
 */
export interface IAppStorage {
    /**
     * Return Promise<Todo[]> | Observable<Todo[]> | any
     * @param val Value to compare with
     * @param orderBy Column name
     */
    getListForGivenDate$(val: any, orderBy: string): Promise<any> | Observable<Todo[]> | any;
    /**
     * Return Promise<any> | Observable<any> | any
     * @param item Todo
     */
    addTodo(item: Todo): Promise<any> | Observable<any> | any;
    /**
     * Return Promise<any> | Observable<any> | any
     * @param item Todo
     * @param key Todo key
     */
    updateTodo(item: Todo, key: string): Promise<any> | Observable<any> | any;
    /**
     * Return Promise<any> | Observable<any> | any
     * @param key Todo key
     */
    deleteTodo(key: string): Promise<any> | Observable<any> | any;

}
