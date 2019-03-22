import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AddTodoComponent implements OnInit {

  todoForm: FormGroup;

  @Input()
  todoItem: Todo;

  constructor(private fb: FormBuilder, private modal: ModalController) { }

  ngOnInit() {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      desc: ['', [Validators.required]]
    });

    if (this.todoItem) {
      this.todoForm.patchValue({ ...this.todoItem });
    }
  }

  OnSubmit() {
    this.onClose();
  }

  onClose() {
    this.modal.dismiss(this.todoForm.valid ? this.todoForm.value : null);
  }

  closePopUp() {
    this.modal.dismiss();
  }

}
