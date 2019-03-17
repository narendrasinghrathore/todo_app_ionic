import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CoreService } from './core.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        CoreService
      ]
    };
  }
}
