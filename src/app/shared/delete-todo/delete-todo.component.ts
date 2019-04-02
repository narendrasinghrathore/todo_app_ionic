import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-delete-todo',
  templateUrl: './delete-todo.component.html',
  styleUrls: ['./delete-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteTodoComponent implements OnInit {

  @Input()
  todoItem: Todo;

  constructor(private modal: ModalController) { }

  ngOnInit() { }

  confirmDelete() {
    this.modal.dismiss(this.todoItem);
  }


  closePopUp() {
    this.modal.dismiss();
  }

}
