import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CalendarService } from './calendar.service';

import { MonthComponent } from './component/month/month.component';
import { WeekComponent } from './component/week/week.component';

@NgModule({
  declarations: [
    CalendarComponent,
    WeekComponent,
    MonthComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '', component: CalendarComponent, pathMatch: 'full'
      }
    ])
  ],
  providers: [CalendarService],
  exports: [CalendarComponent]
})
export class CalendarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CalendarModule,
      providers: [
      ]
    };
  }
}
