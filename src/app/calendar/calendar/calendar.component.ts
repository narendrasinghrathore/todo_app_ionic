import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarService, CalendarWeek } from '../calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnInit {

  week: CalendarWeek[];

  todayDate: CalendarWeek;

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    this.week = this.calendarService.getWeekFromDay(new Date());
  }

  getSelectedDate(date: CalendarWeek) {
  }

  selectToday() {
    if (this.week.length > 0) {
      this.todayDate = {...this.week.filter(data => data.currentDate)[0]};
    }
  }

}
