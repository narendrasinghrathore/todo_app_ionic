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
@NgModule({
  declarations: [AddTodoComponent, DeleteTodoComponent,
    LoadingComponent, TodoListPipe, ColorSelectionComponent, HeaderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ],
  entryComponents: [AddTodoComponent, DeleteTodoComponent, ColorSelectionComponent, ColorSelectionComponent],
  exports: [AddTodoComponent, DeleteTodoComponent, LoadingComponent, TodoListPipe, HeaderComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [SharedService]
    };
  }
}
