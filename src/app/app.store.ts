import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { distinctUntilChanged } from 'rxjs/operators';
import { pluck } from 'rxjs/operators';
import { Todo } from './models/todo.model';
import { AppUser } from './models/User';
import { AppUserData } from './models/firebase.model';


export enum AppStateProps {
    user = 'user',
    todos = 'todos',
    userProfileData = 'userProfileData',
    filteredTodos = 'filteredTodos'
}

export interface State {
    [AppStateProps.user]: AppUser;
    [AppStateProps.todos]: Todo[];
    [AppStateProps.userProfileData]: AppUserData;
    [AppStateProps.filteredTodos]: Todo[];
    [key: string]: any;
}

const state: State = {
    [AppStateProps.user]: undefined,
    [AppStateProps.todos]: undefined,
    [AppStateProps.userProfileData]: undefined,
    [AppStateProps.filteredTodos]: undefined
};

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
