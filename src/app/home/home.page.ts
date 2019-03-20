import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppFirebaseService } from '../firebase/firebase.service';
import { Subscription, Observable } from 'rxjs';
import { SharedService } from '../shared/services/shared.service';
import { AppFirebaseCRUDService } from '../firebase/crud.service';
import { Store } from 'store';
import { Todo } from '../models/todo.model';
import { switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

    googleSignInSubs: Subscription;

    todoList$: Observable<Todo[]>;

    todoListSusb: Subscription;

    constructor(private auth: AppFirebaseService,
        private shared: SharedService, private fire: AppFirebaseCRUDService,
        private store: Store) { }

    ngOnInit() {

        this.todoList$ = this.store.select<Todo[]>('todos');

        this.todoListSusb = this.fire.todoList$(this.fire.url).subscribe();

    }

    login(): void {
        this.googleSignInSubs = this.auth.signInGoogle().subscribe(data => console.log(data));
        // this.todoListSusb.add(this.googleSignInSubs);
    }


    async addTodo() {
        const modal = await this.shared.addTodoDialog();
        const { data } = await modal.onDidDismiss();
        if (data) {
            this.fire.addTodo(data);
        }
    }

    async openTodo(item: Todo) {
        const modal = await this.shared.addTodoDialog(item);
        const { data } = await modal.onDidDismiss();
        if (data) {
            this.fire.updateTodo(data, item.key);
        }
    }


    ngOnDestroy() {
        this.todoListSusb.unsubscribe();
    }

}
