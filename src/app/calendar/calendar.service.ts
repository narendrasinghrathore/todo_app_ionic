import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

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
  }

  /**
   * Will return a list of array that contain
   * week of passing day
   * @param day : number
   */
  getWeekFromDay(date: Date) {
    const day = date.getDay();
    const array: CalendarWeek[] = [];
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
