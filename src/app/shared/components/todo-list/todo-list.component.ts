import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation, Output } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TodoListComponent implements OnInit {

  @Input()
  list: Todo[] = [];

  @Output()
  open: EventEmitter<Todo> = new EventEmitter();

  @Output()
  restore: EventEmitter<Todo> = new EventEmitter();

  @Output()
  delete: EventEmitter<Todo> = new EventEmitter();

  @Output()
  complete: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  openTodo(item: Todo) {
    this.open.emit(item);
  }

  restoreTodo(item: Todo) {
    this.restore.emit(item);
  }

  deleteTodo(item: Todo) {
    this.delete.emit(item);
  }

  /**
   * Emit item is marking as completed or not completed
   * @param flag boolean
   * @param item Todo
   */
  markComplete(flag: boolean, item: Todo) {
    item = { ...item, isCompleted: flag };
    this.complete.emit(item);
  }

  ngOnInit() { }

  isOffline(item: Todo) {
    return item.isNew || item.isUpdated || item.isDeleted ? true : false;
  }

}
