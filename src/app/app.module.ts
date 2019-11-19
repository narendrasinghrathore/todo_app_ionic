import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppFirebaseModule } from './firebase/firebase.module';
import { CoreModule } from './core/core.module';
import { GuardModule } from './guards/guard.module';
import { Store } from 'store';
import { SharedModule } from './shared/shared.module';
import { CalendarModule } from './calendar/calendar.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/reducers/customer-serializer.router';
import { effect } from './store/effects';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: 'myApp'
    }),
    CoreModule.forRoot(),
    AppFirebaseModule.forRoot(),
    GuardModule.forRoot(),
    SharedModule.forRoot(),
    AppRoutingModule,
    // CalendarModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot(effect),
    // Connects RouterModule with StoreModule
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    })
  ],
  providers: [
    Store,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
