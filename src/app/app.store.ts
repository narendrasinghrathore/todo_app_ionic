import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { distinctUntilChanged } from 'rxjs/operators';
import { pluck } from 'rxjs/operators';
import { Todo } from './models/todo.model';
import { AppUser } from './models/User';




export interface State {
    user: AppUser;
    todos: Todo[];
    [key: string]: any;
}

const state: State = {
    user: undefined,
    todos: undefined
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

    select<T>(name: string): Observable<T> {
        return this.store
            .pipe(
                pluck(name)
            );
    }

    set(name: string, state_: any) {
        this.subject.next({ ...this.value, [name]: state_ });
    }
}
