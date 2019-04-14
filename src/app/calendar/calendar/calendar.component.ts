import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CalendarService, CalendarWeek, CalendarMonth } from '../calendar.service';
import { Subscription, Observable } from 'rxjs';
import { Todo } from '../../models/todo.model';
import { AppFirebaseCRUDService } from '../../firebase/crud.service';
import { Store, AppStateProps } from 'store';
import { switchMap, } from 'rxjs/operators';
import { of } from 'rxjs';
import { SharedService } from '../../shared/services/shared.service';
import { CoreService } from '../../core/core.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit, OnDestroy {

  week: CalendarWeek[];

  week$: Subscription;

  month: CalendarMonth[];

  month$: Subscription;

  selectedDate = new Date();

  todayDate: CalendarWeek;

  todoList$: Observable<Todo[]>;

  todoListSusb: Subscription;

  selectedDateFromWeek: CalendarWeek;

  showDeleted = {
    value: 'Show removed todo items',
    isChecked: false
  };


  constructor(private calendarService: CalendarService, private fire: AppFirebaseCRUDService,
    private store: Store, private shared: SharedService, private core: CoreService) { }

  ngOnInit() {

    this.fire.offlineDatabaseEvent.subscribe((event) => {
      this.getTodosForSelectedDate(this.selectedDateFromWeek);
    });

    this.todoList$ = this.store.select<Todo[]>(AppStateProps.filteredTodos);

    const date = new Date();

    { /// Subscribe and get total days in week
      this.week$ = this.calendarService.getWeekFromDay$.subscribe((data) => {
        this.week = [...data];
        this.setTodayDate();

      });
      this.calendarService.getWeekFromDay(date);
    }
    { /// Subscribe and get total days of month
      this.month$ = this.calendarService.getTotalDaysOfMonth$.subscribe((data: CalendarMonth[]) => {
        this.month = [...data];
      });

      this.calendarService.getTotalDaysOfMonth(date.getFullYear(), date.getMonth() + 1);
    }

    this.week$.add(this.month$);
    // get todo for today i.e current date
    this.getTodosForSelectedDate(this.todayDate);

  }

  showAll() {
    this.showDeleted.isChecked = !this.showDeleted.isChecked;
    this.getTodosForSelectedDate(this.selectedDateFromWeek);
  }

  getTodosForSelectedDate(date: CalendarWeek) {
    this.selectedDateFromWeek = date;
    this.todoListSusb = this.fire.getListForGivenDate$(date.date.toDateString(), 'date', this.showDeleted.isChecked).subscribe();
  }


  updateDate(date) {
    this.selectedDate = new Date(date['detail']['value']);
    this.calendarService.getTotalDaysOfMonth(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1);
    this.calendarService.getWeekFromDay(this.selectedDate);
    this.getTodosForSelectedDate(this.todayDate);
  }

  selectToday() {
    const today = new Date();
    {  // set to default i.e today date
      this.calendarService.getWeekFromDay(today);
      this.calendarService.getTotalDaysOfMonth(today.getFullYear(), today.getMonth() + 1);
    }
    if (this.week.length > 0) {
      this.todayDate = { ...this.week.filter(data => data.currentDate)[0] };
      this.selectedDate = this.todayDate.date;
    }
  }

  private setTodayDate() {
    const defaultDate = this.week.filter(data => data.currentDate);
    if (defaultDate.length > 0) {
      this.todayDate = { ...defaultDate[0] };
    }
  }

  async openTodo(item: Todo) {
    if (item.isDeleted) {
      this.core.displayToast(`Item deleted, restore first to make changes`);
      return;
    }
    const modal = await this.shared.addTodoDialog(item);
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.fire.updateTodo({ ...item, ...data }, item.key);
      this.core.displayToast(`Changes saved`);
    }
  }

  async restoreTodo(item: Todo) {
    await this.fire.restoreTodoDeleted(item);
    this.core.displayToast(`Todo restored`);
  }

  async confirmDelete(item: Todo) {
    const modal = await this.shared.confirmDeleteDialog(item);
    const { data } = await modal.onDidDismiss();
    if (data) {
      await this.fire.deleteTodo(item.key, item);
      this.core.displayToast(`Todo removed`);
    }
  }


  ngOnDestroy(): void {
    this.week$.unsubscribe();
  }


}
