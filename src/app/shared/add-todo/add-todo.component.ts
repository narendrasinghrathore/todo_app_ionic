import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';

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

  @Output()
  onsubmit: EventEmitter<FormGroup> = new EventEmitter(null);

  constructor(private fb: FormBuilder) { }

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
    if (this.todoForm.valid) {
      this.onsubmit.emit(this.todoForm);
    }
  }

}
