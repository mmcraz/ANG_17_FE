import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SharedModule } from "../shared/shared.module";
import { SliderModule } from "primeng/slider";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { ViewOrdersComponent } from "./components/view-orders/view-orders.component";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";

@NgModule({
  declarations: [DashboardComponent, CheckoutComponent, ViewOrdersComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    SliderModule,
    TableModule,
    ButtonModule,
  ],
  providers: [DatePipe],
})
export class DashboardModule {}
