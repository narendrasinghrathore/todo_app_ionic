import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { CalendarService, CalendarWeek, CalendarMonth } from '../calendar.service';
import { Subscription } from 'rxjs';

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

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {

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
  }

  getSelectedDateFromWeek(date: CalendarWeek) {
    this.selectedDate = date.date;
  }


  updateDate(date) {
    this.selectedDate = new Date(date['detail']['value']);
    this.calendarService.getTotalDaysOfMonth(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1);
    this.calendarService.getWeekFromDay(this.selectedDate);
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


  ngOnDestroy(): void {
    this.week$.unsubscribe();
  }


}
