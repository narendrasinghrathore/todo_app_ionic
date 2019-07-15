import { Injectable, NgZone } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private ngZone: NgZone) { }

  getTotalDaysOfMonth$: BehaviorSubject<CalendarMonth[]> = new BehaviorSubject([]);

  getWeekFromDay$: BehaviorSubject<CalendarWeek[]> = new BehaviorSubject([]);

  /**
   * Return an array of days of passed year and month
   * @param year : number
   * Year as number
   * @param month : number 1-12
   */
  getTotalDaysOfMonth(year: number, month: number) {
    const lastDay = new Date(year, month, 0).getDate();
    /**
     * Running functions via runOutsideAngular allows you to escape Angular's zone
     * and do work that doesn't trigger Angular change-detection or is subject to
     * Angular's error handling. Any future tasks or microtasks scheduled from
     * within this function will continue executing from outside of the
     * Angular zone. Use run to reenter the Angular zone
     * and do work that updates the application model.
     */
    this.ngZone.runOutsideAngular(() => {
      const arr = [...Array(lastDay).fill({
        date: new Date(year, month - 1, 1),
        day: 0
      }).map((x: CalendarMonth, index) => {
        const date = new Date(year, month - 1, index + 1);
        const day = index + 1;
        if (new Date().getDate() === date.getDate()) {
          return { ...x, date, day, today: true };
        }
        return { ...x, date, day };
      })];
      this.getTotalDaysOfMonth$.next(arr);
    });
  }

  /**
   * Will return a list of array that contain
   * week of passing day
   * @param day : number
   */
  getWeekFromDay(date: Date) {
    const day = date.getDay();
    const array: CalendarWeek[] = [];
    /**
     * Running functions via runOutsideAngular allows you to escape Angular's zone
     * and do work that doesn't trigger Angular change-detection or is subject to
     * Angular's error handling. Any future tasks or microtasks scheduled from
     * within this function will continue executing from outside of the
     * Angular zone. Use run to reenter the Angular zone
     * and do work that updates the application model.
     */
    this.ngZone.runOutsideAngular(() => {
      for (let i = 0; i < 7; i++) {
        if (i - day !== 0) {
          const days = i - day;
          const newDate = new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));

          array.push({
            date: newDate,
            dayOfWeek: newDate.getDay(),
            displayDate: newDate.toLocaleDateString(),
            currentDate: false
          });
        } else {
          array.push({
            date,
            displayDate: date.toLocaleDateString(),
            dayOfWeek: date.getDay(),
            currentDate: true
          });
        }
      }
      this.getWeekFromDay$.next(array);
    });
  }
}


export interface CalendarWeek {
  date: Date;
  displayDate: string;
  dayOfWeek: number;
  currentDate: boolean;
}


export interface CalendarMonth {
  date: Date;
  day: number;
  today?: boolean;
}
