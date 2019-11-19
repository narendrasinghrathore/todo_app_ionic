import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';

// module imports
import { AuthModule } from '../auth/auth.module';

// component imports
import { LoginComponent } from './login/login.component';
import { IonicModule } from '@ionic/angular';

// routes def
const LoginRoute: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  }
];

// Store
import { StoreModule } from '@ngrx/store';
import { reducer } from './store/login.reducer';
import { environment } from '../../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffectService } from './store/login.effect';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoute),
    IonicModule,
    AuthModule,
    StoreModule.forFeature(environment.store.login.storeName, reducer),
    EffectsModule.forFeature([LoginEffectService])
  ]
})
export class LoginModule {}
