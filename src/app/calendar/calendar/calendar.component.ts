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


  constructor(private calendarService: CalendarService, private fire: AppFirebaseCRUDService,
    private store: Store, private shared: SharedService, private core: CoreService) { }

  ngOnInit() {

    this.fire.offlineDatabaseEvent.subscribe(() => {
      this.getTodosForSelectedDate(this.todayDate);
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

  getTodosForSelectedDate(date: CalendarWeek) {
    this.todoListSusb = of([])
      .pipe(
        switchMap(
          () => this.fire.getListForGivenDate$(date.date.toDateString())
        )
      ).subscribe();
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
    const modal = await this.shared.addTodoDialog(item);
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.fire.updateTodo({ ...item, ...data }, item.key);
      this.core.displayToast(`Changes saved`);
    }
  }

  async confirmDelete(item: Todo) {
    const modal = await this.shared.confirmDeleteDialog(item);
    const { data } = await modal.onDidDismiss();
    if (data) {
      await this.fire.deleteTodo(item.key);
      this.core.displayToast(`Todo removed`);
    }
  }


  ngOnDestroy(): void {
    this.week$.unsubscribe();
  }


}
