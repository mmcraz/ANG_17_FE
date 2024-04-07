import { Component } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent {
  getOrder: any = [
    {
      model: "",
      pattern: "",
      text: "1989",
      fsize: 32,
      space: 0,
      size: "",
      userId: 0,
    },
  ];

  orderPlaced: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    const serializedObject: any = localStorage.getItem("order");
    const order = JSON.parse(serializedObject);
    this.getOrder = order;
  }

  getStyle() {
    return {
      "font-size": this.getOrder.fsize + "px",
      top: this.getOrder.ps + "px",
      "letter-spacing": this.getOrder.space + "px",
    };
  }
  placeOrder() {
    delete this.getOrder.ps;
    this.getOrder.status = "In Progress";
    const userInfo: any = this.authService.getUserInfo();
    this.getOrder.userId = userInfo[0]._id;
    this.authService.saveOrders(this.getOrder).subscribe((data) => {
      this.orderPlaced = true;
      console.log("Order placed", data);
    });
  }

  viewOrder() {
    this.router.navigate(["/app/home/orders"]);
  }
  back() {
    this.router.navigate(["/app/home/"]);
  }
}
