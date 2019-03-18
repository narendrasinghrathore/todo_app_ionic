import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedService } from './services/shared.service';
import { LoadingComponent } from './loading/loading.component';
import { TodoListPipe } from './pipes/todo-list.pipe';
@NgModule({
  declarations: [AddTodoComponent, LoadingComponent, TodoListPipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ],
  entryComponents: [AddTodoComponent],
  exports: [AddTodoComponent, LoadingComponent, TodoListPipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [SharedService]
    };
  }
}
