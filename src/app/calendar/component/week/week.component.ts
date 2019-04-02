import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CalendarWeek } from '../../calendar.service';
@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekComponent implements OnInit {

  @Input()
  week: CalendarWeek[];

  /**
   * Will return selected date
   */
  @Output()
  selectedDate: EventEmitter<CalendarWeek> = new EventEmitter();

  @Input()
  defaultSelectedDate: CalendarWeek;

  constructor() { }

  ngOnInit() {
    const defaultDate = this.week.filter(data => data.currentDate);
    if (defaultDate.length > 0) {
      this.defaultSelectedDate = defaultDate[0];
    }
  }

  getSelectedDate(item: CalendarWeek) {
    this.defaultSelectedDate = item;
    this.selectedDate.emit(item);
  }

}
