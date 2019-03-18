import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { Todo } from 'src/app/models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private modalController: ModalController) { }

  async addTodoDialog(todoItem?: Todo): Promise<HTMLIonModalElement> {
    const modal = await this.modalController.create({
      component: AddTodoComponent,
      componentProps: { todoItem }
    });
    await modal.present();
    return modal;
  }
}
