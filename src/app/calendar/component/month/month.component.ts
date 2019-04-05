import { Component, OnInit, Input, ChangeDetectionStrategy, ViewEncapsulation, OnDestroy } from '@angular/core';
import { CalendarMonth } from '../../calendar.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class MonthComponent implements OnInit, OnDestroy {

  @Input()
  month: CalendarMonth[];

  @Input()
  date: Date;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

}
