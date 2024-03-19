import { Component } from "@angular/core";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrl: "./checkout.component.scss",
})
export class CheckoutComponent {
  getOrder: any = [
    {
      color: "",
      pattern: "",
      text: "1989",
      size: 32,
      space: 0,
      tsize: "",
    },
  ];

  constructor() {
    const serializedObject: any = localStorage.getItem("order");
    this.getOrder[0] = JSON.parse(serializedObject);
    console.log(this.getOrder[0].color);
  }

  getStyle() {
    return {
      "font-size": this.getOrder[0].size + "px",
      top: this.getOrder[0].ps + "px",
      "letter-spacing": this.getOrder[0].space + "px",
    };
  }
  placeOrder() {}
}
