import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { SliderModule } from 'primeng/slider';
import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
  declarations: [
    DashboardComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    SliderModule
  ]
})
export class DashboardModule { }
