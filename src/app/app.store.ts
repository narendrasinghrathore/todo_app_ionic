import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { distinctUntilChanged } from 'rxjs/operators';
import { pluck } from 'rxjs/operators';
import { Todo } from './models/todo.model';
import { AppUser } from './models/User';
import { AppUserData } from './models/firebase.model';

/**
 * Defining enum for type safety, it always a best practice.
 * This enum are used for define the structure of state
 */
export enum AppStateProps {
    user = 'user',
    todos = 'todos',
    userProfileData = 'userProfileData',
    filteredTodos = 'filteredTodos'
}
/**
 * Application state interface
 */
export interface State {
    [AppStateProps.user]: AppUser;
    [AppStateProps.todos]: Todo[];
    [AppStateProps.userProfileData]: AppUserData;
    [AppStateProps.filteredTodos]: Todo[];
    /**
     * Indexable types have an index signature that describes the types
     * we can use to index into the object, along with the corresponding
     * return types when indexing.
     */
    [key: string]: any;
}

const state: State = {
    [AppStateProps.user]: undefined,
    [AppStateProps.todos]: undefined,
    [AppStateProps.userProfileData]: undefined,
    [AppStateProps.filteredTodos]: undefined
};
/**
 * State management class having implementation to perform state changes
 */
export class Store {
    private subject = new BehaviorSubject<State>(state);
    private store = this.subject.asObservable()
        .pipe(
            distinctUntilChanged()
        );

    get value() {
        return this.subject.value;
    }

    select<T>(name: AppStateProps): Observable<T> | any {
        return this.store
            .pipe(
                pluck(name)
            );
    }

    set(name: AppStateProps, state_: any) {
        this.subject.next({ ...this.value, [name]: state_ });
    }
}
