import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { AppFirebaseCRUDService } from '../../../firebase/crud.service';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './add-todo-container.component.html',
  styleUrls: ['./add-todo-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  selector: 'app-add-todo-container, [appAddTodoContainer], .appAddTodoContainer',
})
export class AddTodoContainerComponent implements OnInit {


  @Input()
  color: string;

  @Input()
  background: string;

  constructor(private shared: SharedService, private fire: AppFirebaseCRUDService) { }

  ngOnInit() { }

  async addTodo() {
    const modal = await this.shared.addTodoDialog();
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.fire.addTodo(data);
    }
  }

}
