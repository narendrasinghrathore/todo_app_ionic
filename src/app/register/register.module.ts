import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
// module imports
import { AuthModule } from '../auth/auth.module';

// components imports
import { RegisterComponent } from '../register/register/register.component';



// routes
const RegisterRoute: Routes = [
  {
    path: '', pathMatch: 'full', component: RegisterComponent
  }

];


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(RegisterRoute),
    IonicModule,
    AuthModule
  ]
})
export class RegisterModule { }
