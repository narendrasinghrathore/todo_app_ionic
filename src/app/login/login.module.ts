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
    path: '', pathMatch: 'full', component: LoginComponent
  }

];


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoute),
    IonicModule,
    AuthModule
  ],
})
export class LoginModule { }
