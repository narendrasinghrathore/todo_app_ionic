import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders } from '@angular/core';
import { HomeGuard } from './home.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class GuardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: GuardModule,
      providers: [HomeGuard]
    };
  }
}
