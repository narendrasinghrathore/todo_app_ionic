import { TodoListPipe } from './todo-list.pipe';

describe('TodoListPipe', () => {
  it('create an instance', () => {
    const pipe = new TodoListPipe();
    expect(pipe).toBeTruthy();
  });
});
