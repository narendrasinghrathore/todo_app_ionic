import { Injectable } from '@angular/core';
import { AppOnlineStorageService } from './online-storage.service';
import { AppOfflineStorageService } from './offline-storage.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Factory that return instances
 * 1) AppOnlineStorageService i.e Firebase Realtime DB
 * 2) AppOfflineStorageService i.e IndexDB
 */
export class AppFactoryService {

  constructor(private onlineDBInstance: AppOnlineStorageService,
    private offlineDBInstance: AppOfflineStorageService) { }


  /**
   * Return instance of AppOnlineStorageService that contain
   * firebase instance
   */
  get OnlineFirebaseInstance(): AppOnlineStorageService {
    return this.onlineDBInstance;
  }
  /**
   * Return instance of AppOfflineStorageService that contain
   * IndexDB instance
   */
  get OfflineIndexDBStorage(): AppOfflineStorageService {
    return this.offlineDBInstance;
  }
}
