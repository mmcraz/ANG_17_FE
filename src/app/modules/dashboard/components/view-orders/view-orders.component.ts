import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-view-orders",
  templateUrl: "./view-orders.component.html",
  styleUrl: "./view-orders.component.scss",
})
export class ViewOrdersComponent implements OnInit {
  orderList: any = [];

  refresh: boolean = false;
  constructor(private authService: AuthService) {}

  cancelOrder(orderId: any) {
    this.refresh = true;
    this.authService.deleteOrder(orderId).subscribe((d) => {
      this.getOrders();
    });
  }

  removeOrder(orderId: any) {
    this.authService.permanentDeleteOrder(orderId).subscribe((d) => {
      this.getOrders();
    });
  }

  getOrders() {
    //  this.orderList$ = this.authService.getOrders(userInfo[0]._id);
  }
  ngOnInit(): void {
    this.getOrders();
    const userInfo = this.authService.getUserInfo();
    this.authService.getOrders(userInfo[0]._id).subscribe((data) => {
      this.refresh = false;

      console.log("Order list", data);
      this.orderList = data;
    });
  }
}
