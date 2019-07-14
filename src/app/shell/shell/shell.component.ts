import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
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


  constructor() { }

  ngOnInit() {}

}
