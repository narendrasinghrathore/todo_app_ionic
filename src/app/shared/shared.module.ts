import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedService } from './services/shared.service';
import { LoadingComponent } from './loading/loading.component';
import { TodoListPipe } from './pipes/todo-list.pipe';
import { DeleteTodoComponent } from './delete-todo/delete-todo.component';
import { ColorSelectionComponent } from './color-selection/color-selection.component';
import { HeaderComponent } from './header/header.component';
import { AddTodoContainerComponent } from './container/add-todo-container/add-todo-container.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AddTodoDirective } from './directives/add-todo.directive';
@NgModule({
  declarations: [AddTodoComponent, DeleteTodoComponent,
    LoadingComponent,
    TodoListPipe, ColorSelectionComponent, HeaderComponent,
    AddTodoContainerComponent, TodoListComponent, AddTodoDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ],
  entryComponents: [
    AddTodoContainerComponent,
    AddTodoComponent,
    DeleteTodoComponent,
    ColorSelectionComponent,
    ColorSelectionComponent],
  exports: [AddTodoComponent, DeleteTodoComponent,
    LoadingComponent, TodoListPipe, HeaderComponent,
    AddTodoContainerComponent, TodoListComponent,
    AddTodoDirective]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [SharedService]
    };
  }
}
