import { Component } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: "app-view-orders",
  templateUrl: "./view-orders.component.html",
  styleUrl: "./view-orders.component.scss",
})
export class ViewOrdersComponent {
  orderList: any = [];
  constructor(private authService: AuthService) {
    const userInfo = this.authService.getUserInfo();
    this.authService.getOrders(userInfo[0]._id).subscribe((data) => {
      console.log("Order list", data);
      this.orderList = data.slice().reverse();
    });
  }
}
