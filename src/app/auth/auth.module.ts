import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth/auth.component';
import { IonicModule } from '@ionic/angular';

import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [AuthComponent]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: []
    };
  }
}
