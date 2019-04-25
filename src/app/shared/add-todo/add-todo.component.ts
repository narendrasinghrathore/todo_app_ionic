import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/app/models/todo.model';
import { ModalController } from '@ionic/angular';
import { take, map } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

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

  /// User cannot select date day before today
  minDate = new Date().toISOString();

  selectedDate: BehaviorSubject<Date> = new BehaviorSubject(new Date());

  constructor(private fb: FormBuilder, private modal: ModalController) { }

  // if update todo, then disable date selection
  disableDate: boolean = false;

  ngOnInit() {

    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      desc: ['', [Validators.required]],
      timestamp: [new Date().getTime()],
    });



    if (this.todoItem) {
      this.todoForm.patchValue({ ...this.todoItem });
      this.disableDate = true;

    }

    this.todoForm
      .get('timestamp').valueChanges.pipe(map(timestamp => new Date(timestamp)), take(1))
      .subscribe(data => this.selectedDate.next(data));
  }

  updateDate(event) {
    this.todoForm.patchValue({
      timestamp: new Date(event['detail']['value']).getTime()
    });
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
