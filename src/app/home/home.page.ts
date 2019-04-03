import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AppFirebaseService } from '../firebase/firebase.service';
import { Subscription, Observable } from 'rxjs';
import { SharedService } from '../shared/services/shared.service';
import { AppFirebaseCRUDService } from '../firebase/crud.service';
import { Store } from 'store';
import { Todo } from '../models/todo.model';
import { CoreService } from '../core/core.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit, OnDestroy {

    googleSignInSubs: Subscription;

    todoList$: Observable<Todo[]>;

    todoListSusb: Subscription;

    appState = this.appFire.appStatus$;

    constructor(private appFire: AppFirebaseService,
        private shared: SharedService, private fire: AppFirebaseCRUDService,
        private store: Store, private core: CoreService) { }

    ngOnInit() {

        this.todoList$ = this.store.select<Todo[]>('todos');

        this.todoListSusb = this.fire.todoList$(this.fire.url).subscribe();

    }

    login(): void {
        this.googleSignInSubs = this.appFire.signInGoogle().subscribe(data => console.log(data));
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
            this.core.displayToast(`Changes saved`);
        }
    }

    async confirmDelete(item: Todo) {
        const modal = await this.shared.confirmDeleteDialog(item);
        const { data } = await modal.onDidDismiss();
        if (data) {
            await this.fire.deleteTodo(item.key);
            this.core.displayToast(`Todo removed`);
        }
    }


    ngOnDestroy() {
        this.todoListSusb.unsubscribe();
    }

}
