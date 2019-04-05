import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CalendarWeek } from '../../calendar.service';
@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeekComponent {

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

  getSelectedDate(item: CalendarWeek) {
    this.defaultSelectedDate = item;
    this.selectedDate.emit(item);
  }

}
