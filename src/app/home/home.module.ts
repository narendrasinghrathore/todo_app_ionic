import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AppFirebaseModule } from '../firebase/firebase.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    AppFirebaseModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
      }
    ]),
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
