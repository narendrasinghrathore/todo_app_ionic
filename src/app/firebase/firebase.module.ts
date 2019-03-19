import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from 'src/environments/environment.prod';
import { AppFirebaseService } from './firebase.service';
import { AppFirebaseCRUDService } from './crud.service';
import { FirebaseUserService } from './user.service';
@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ]
})
export class AppFirebaseModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppFirebaseModule,
      providers: [
        AppFirebaseService,
        AppFirebaseCRUDService,
        FirebaseUserService
      ]
    };
  }
}
