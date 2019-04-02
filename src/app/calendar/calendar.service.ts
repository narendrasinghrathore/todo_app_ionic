import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  /**
   * Return an array of days of passed year and month
   * @param year : number
   * Year as number
   * @param month : number 1-12
   */
  getTotalDaysOfMonth(year: number, month: number): Date[] {
    const lastDay = new Date(year, month, 0).getDate();
    return [...Array(lastDay).fill(1).map((x, y) => x + y)];
  }

  /**
   * Will return a list of array that contain
   * week of passing day
   * @param day : number
   */
  getWeekFromDay(date: Date): CalendarWeek[] {
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
    return array;

  }
}


export interface CalendarWeek {
  date: Date;
  displayDate: string;
  dayOfWeek: number;
  currentDate: boolean;
}
