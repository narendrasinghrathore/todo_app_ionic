import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthPage } from './month.page';

describe('MonthPage', () => {
  let component: MonthPage;
  let fixture: ComponentFixture<MonthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
