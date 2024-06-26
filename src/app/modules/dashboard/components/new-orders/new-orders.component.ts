import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../../../core/services/auth.service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-new-orders",
  templateUrl: "./new-orders.component.html",
  styleUrl: "./new-orders.component.scss",
})
export class NewOrdersComponent implements OnInit {
  orderList: any = [];
  status!: any[];
  visible: boolean = false;
  clonedProducts: { [s: string]: any } = {};

  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) {
    this.status = [
      { label: "Preparing", value: "Preparing" },
      { label: "Shipped", value: "Shipped" },
      { label: "Delivered", value: "Delivered" },
    ];
  }
  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.authService.getNewOrders().subscribe((data) => {
      this.orderList = data;
    });
  }

  onRowEditInit(product: any) {
    this.clonedProducts[product.id as string] = { ...product };
  }

  onRowEditSave(product: any) {
    console.log(product);
    this.authService.updateOrders(product).subscribe((data) => {});
  }
  onRowEditCancel(product: any, index: number) {
    this.orderList[index] = this.clonedProducts[product.id as string];
    delete this.clonedProducts[product.id as string];
  }

  deletedProduct(product: any, index: number) {
    this.authService.permanentDeleteOrder(product._id).subscribe((data) => {
      this.refreshData();
      this.messageService.add({
        severity: "success",
        summary: "success",
        detail: "Product successfully deleted",
      });
    });
  }
  userInfo: any;
  viewUser(order: any) {
    this.visible = true;
    this.authService.getUserDataDB(order.userId).subscribe((data) => {
      this.userInfo = data;
    });
  }
}
