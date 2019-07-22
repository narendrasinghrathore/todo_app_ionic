import { Component, OnInit } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ThemeManagerService } from 'src/app/shared/services/theme-manager.service';
import { ITheme } from 'src/app/models/Theme';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent implements OnInit {
  public appPages = [
    {
      title: 'Dashboard',
      url: '/home/dashboard',
      icon: 'home'
    }, {
      title: 'Home',
      url: '/home/calendar',
      icon: 'calendar'
    },
    {
      title: 'Setting',
      url: '/home/setting',
      icon: 'settings'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'log-out'
    }
  ];

  colors: ITheme[];

  subs: Subscription;


  constructor(public themeManager: ThemeManagerService) { }

  ngOnInit() {
    this.themeManager.getDefaultTheme();

  }
  /**
   * Apply selected theme on change of select
   * @param theme :id number
   */
  changeTheme(themeId: number) {
    this.themeManager.setTheme(themeId);
  }


}
