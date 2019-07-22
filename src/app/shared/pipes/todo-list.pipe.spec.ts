import { TodoListPipe } from './todo-list.pipe';
import { Todo } from '../../models/todo.model';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

const todoList: Todo[] =
  [
    {
      title: '1',
      timestamp: 1552881668403
    },
    {
      title: '2',
      timestamp: 1552882569316
    },
    {
      title: '3',
      timestamp: 1552882816653
    },
    {
      title: '4',
      timestamp: 1552884321876
    }
  ];

describe('TodoListPipe', () => {

  describe(' Shallow Test', () => {
    // here we are creating a shallow test it means
    // we are creating a test env for angular and intialize all part of the app
    // as we do in our application at realtime
    @Component({
      template: `
      <ul>
      <li *ngFor="let item of list | todoList : order">{{item.title}}</li>
      </ul>
      `
    })
    class TestComponent {
      list: Todo[] = todoList;
      order: string;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let ele: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TodoListPipe, TestComponent],
      });
      fixture = TestBed.createComponent(TestComponent);

      component = fixture.componentInstance;

      ele = fixture.nativeElement;

    });

    it(' list should be in ascending order by default ', () => {
      fixture.detectChanges();
      const ul = ele.querySelector('ul');
      expect(ul.firstElementChild.textContent).toContain('1');
    });

    it(' list should be in descending order if pass desc as arg params ', () => {
      component.order = 'dsc';
      fixture.detectChanges();
      const ul = ele.querySelector('ul');
      expect(ul.firstElementChild.textContent).toContain('4');
    });


  });


  describe(' Isolate Test', () => {
    // As we are not importing anything related to angular testing framework
    const pipe = new TodoListPipe();


    it('create an instance', () => {
      expect(pipe).toBeTruthy();
    });

    it('should return an array in ascending order', () => {
      const arr = pipe.transform(todoList);
      // As default array added are in ascending order in timestamp
      expect(arr[0].title).toBe('1');
    });

    it('should return an array in descending order', () => {
      const arr = pipe.transform(todoList, 'dsc');
      // As default array added are in ascending order in timestamp
      expect(arr[0].title).toBe('4');
    });


  });

});
