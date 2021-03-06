import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from 'src/app/models/todo.model';

@Pipe({
  name: 'todoList'
})
export class TodoListPipe implements PipeTransform {

  transform(value: Todo[], args?: any): any {
    if (args === 'dsc' && args) { // means descending order
      return value.sort((a, b) => {
        if (a.timestamp > b.timestamp) {
          return -1;
        }
        if (a.timestamp < b.timestamp) {
          return 1;
        }

        return 0;
      });
    } else {
      // ascending order
      return value.sort((a, b) => {
        if (a.timestamp < b.timestamp) {
          return -1;
        }
        if (a.timestamp > b.timestamp) {
          return 1;
        }

        return 0;
      });
    }
  }

}
