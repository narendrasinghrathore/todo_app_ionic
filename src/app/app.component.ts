import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppFirebaseService } from './firebase/firebase.service';
import { Observable, Subscription, timer } from 'rxjs';
import { AppUser } from './models/User';
import { Store, AppStateProps } from 'store';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  user$: Observable<AppUser>;
  subscription: Subscription;

  showSpinner = false;

  public appPages = [
    {
      title: 'Dashboard',
      url: '/home',
      icon: 'home'
    }, {
      title: 'Home',
      url: '/calendar',
      icon: 'calendar'
    },
    {
      title: 'Setting',
      url: '/setting',
      icon: 'settings'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'log-out'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appFire: AppFirebaseService,
    private store: Store
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(800).subscribe(() => this.showSpinner = false);
    });
  }


  ngOnInit(): void {
    this.subscription = this.appFire.auth$.subscribe();
    this.user$ = this.store.select<AppUser>(AppStateProps.user);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logoutUser() {
    this.appFire.logout();
  }
}
