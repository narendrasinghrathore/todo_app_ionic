import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoContainerPage } from './add-todo-container.page';

describe('AddTodoContainerPage', () => {
  let component: AddTodoContainerPage;
  let fixture: ComponentFixture<AddTodoContainerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTodoContainerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoContainerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
