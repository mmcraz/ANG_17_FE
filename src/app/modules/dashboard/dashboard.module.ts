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
import { InputNumberModule } from "primeng/inputnumber";

import { NewOrdersComponent } from "./components/new-orders/new-orders.component";
import { DropdownModule } from "primeng/dropdown";
import { DialogModule } from "primeng/dialog";

@NgModule({
  declarations: [
    DashboardComponent,
    CheckoutComponent,
    ViewOrdersComponent,
    NewOrdersComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    SliderModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    InputNumberModule,
  ],
  providers: [DatePipe],
})
export class DashboardModule {}
