import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { authGuard } from "../core/guard/auth.guard";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { ViewOrdersComponent } from "./components/view-orders/view-orders.component";
import { NewOrdersComponent } from "./components/new-orders/new-orders.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
  },
  {
    path: "checkout",
    canActivate: [authGuard],
    component: CheckoutComponent,
  },
  {
    path: "orders",
    canActivate: [authGuard],
    component: ViewOrdersComponent,
  },
  {
    path: "newOrders",
    canActivate: [authGuard],
    component: NewOrdersComponent,
  },
  //
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
