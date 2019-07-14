import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell/shell.component';
import { ShellRoutingModule } from './shell.routing';
import { IonicModule, } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [ShellComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    ShellRoutingModule
  ],
  exports: [ShellRoutingModule, ShellComponent]
})
export class ShellModule { }
