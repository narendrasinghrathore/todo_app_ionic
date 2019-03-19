import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppFirebaseService } from './firebase/firebase.service';
import { Observable, Subscription } from 'rxjs';
import { AppUser } from './models/User';
import { Store } from 'store';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  user$: Observable<AppUser>;
  subscription: Subscription;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
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
    });
  }


  ngOnInit(): void {
    this.subscription = this.appFire.auth$.subscribe();
    this.user$ = this.store.select<AppUser>('user');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logoutUser() {
    this.appFire.logout();
  }
}
