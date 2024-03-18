import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CoreComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreRoutingModule,
  
  ]
})
export class CoreModule { }
