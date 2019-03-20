import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting/setting.component';
import { ProfileComponent } from './container/profile/profile.component';
import { AppFirebaseModule } from '../firebase/firebase.module';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AboutComponent } from './container/about/about.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    SettingComponent,
    ProfileComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    AppFirebaseModule,
    ReactiveFormsModule,
    CoreModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '', component: SettingComponent,
        children: [
          { path: 'profile', component: ProfileComponent, pathMatch: 'full', data: { title: 'profile' } },
          { path: 'about', component: AboutComponent, pathMatch: 'full', data: { title: 'about' } },
          { path: '', redirectTo: 'profile' }
        ]
      }
    ])
  ]
})
export class SettingModule { }
