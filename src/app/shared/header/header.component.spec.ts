import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPage } from './header.page';

describe('HeaderPage', () => {
  let component: HeaderPage;
  let fixture: ComponentFixture<HeaderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
