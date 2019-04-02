import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedService } from './services/shared.service';
import { LoadingComponent } from './loading/loading.component';
import { TodoListPipe } from './pipes/todo-list.pipe';
import { DeleteTodoComponent } from './delete-todo/delete-todo.component';
@NgModule({
  declarations: [AddTodoComponent, DeleteTodoComponent, LoadingComponent, TodoListPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ],
  entryComponents: [AddTodoComponent, DeleteTodoComponent],
  exports: [AddTodoComponent, DeleteTodoComponent, LoadingComponent, TodoListPipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [SharedService]
    };
  }
}
