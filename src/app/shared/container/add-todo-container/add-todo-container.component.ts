import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { AppFirebaseCRUDService } from '../../../firebase/crud.service';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-add-todo-container',
  templateUrl: './add-todo-container.component.html',
  styleUrls: ['./add-todo-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AddTodoContainerComponent implements OnInit {

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
