import { Directive, TemplateRef, ViewContainerRef, AfterViewInit, OnDestroy, ComponentFactoryResolver, Inject } from '@angular/core';
import { AddTodoContainerComponent } from '../container/add-todo-container/add-todo-container.component';
import { SharedService } from '../services/shared.service';
import { AppFirebaseService } from 'src/app/firebase/firebase.service';
import { AppFirebaseCRUDService } from 'src/app/firebase/crud.service';
import { INJECTOR } from '@angular/core/src/render3/interfaces/view';

@Directive({
  selector: '[appAddTodo]'
})
export class AddTodoDirective implements AfterViewInit, OnDestroy {

  constructor(private tpl: TemplateRef<AddTodoContainerComponent>,
    private view: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private shared: SharedService, private fire: AppFirebaseCRUDService) { }

  ngAfterViewInit() {

    // this.view.createEmbeddedView(this.tpl.createEmbeddedView(AddTodoContainerComponent));
    const c = this.componentFactoryResolver.resolveComponentFactory<AddTodoContainerComponent>(AddTodoContainerComponent);
    // this.view.createComponent(c);
    // this.tpl.createEmbeddedView(@INJECTOR());

  }

  ngOnDestroy() {
    this.view.clear();
  }

}
