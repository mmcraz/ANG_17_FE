import { Component } from "@angular/core";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";
declare let Email: any;
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
      quantity: 1,
    },
  ];

  orderPlaced: boolean = false;
  quantity = 1;
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
    this.getOrder.status = "Order Placed";
    const userInfo: any = this.authService.getUserInfo();
    this.getOrder.userId = userInfo[0]._id;
    this.getOrder.quantity = this.quantity;
    console.log(this.getOrder);
    this.authService.saveOrders(this.getOrder).subscribe((data) => {
      this.orderPlaced = true;
      console.log("Order placed", data);
    });
    Email.send({
      Host: "smtp.elasticemail.com",
      Username: "mmcrazhr@gmail.com",
      Password: "119836E86D68968AE1250EADFB04BE5231B2",
      To: userInfo[0].email,
      Bcc: ["mmcrazhr@gmail.com"],
      From: "mmcrazhr@gmail.com",
      Subject: "MMCRAZ: Order Confirmation",
      Body: `
      Hi ${userInfo[0].firstName} (${userInfo[0].phone} )
       <br><br>
      Thank you for the order at mmcraz! 
      <br><br>          
      Here the Order Details
      <br><br>   
      <div>
       <strong>Delivery Address</strong>
       <p>
       ${userInfo[0].firstName}<br>  
       ${userInfo[0].email}<br>  
       ${userInfo[0].phone}<br>  
       ${userInfo[0].address}<br>  
       ${userInfo[0].city}<br>   
       ${userInfo[0].state}<br>  
       ${userInfo[0].zip}<br>  
       Payment Method: COD (Cash On Delivery)<br> 
       </p>
       <br><br>  
      </div>
      <br><br>   
      <div style="background:#f8c328;text-align: center;width: 100%; padding: 10px;"><strong>MMCRAZ</strong></div>   
      <table style="border-collapse: collapse;width: 100%;" border="1">
        <tr>
          <th style="border-color: #d3d3d3; padding: 10px;"text-align: left;>Product</th>
          <th style="border-color: #d3d3d3; padding: 10px;text-align: center;">Price</th>            
        </tr>        
  email
      <tr style="background:#fff;text-align: left; padding: 10px;">
      <td style="border-color: #d3d3d3; padding: 10px;text-align: right;">
      <strong>Total</strong><br/>
      <strong>Discount (-)</strong><br/>
      <strong>Delivery Charges</strong>
      </td>
      <td style="border-color: #d3d3d3; padding: 10px; text-align: center;">
      <strong>  100</strong> <br/>
      100<br/>
      100 
      </td>
      <tr style="background:#fff;text-align: left; padding: 10px;">
      <td style="border-color: #d3d3d3; padding: 10px;text-align: center;">
      <strong>Total Amount to Pay</strong>
      </td>
      <td style="border-color: #d3d3d3; padding: 10px; text-align: center;">
      100
      </td>
      </tr>
      </table>
      <br>
      <div style="font-weight:bold">Help center <a href="mailto:mmcrazhr@gmail.com" style="margin-right: 10px;">Email</a> or <span style="margin-left: 10px">9566221663 (Whatsapp Only)</span></div>

      <br>
      <div><span >Track your order</span> <a href="https://mmcraz.com/app/login" target="_blank">Click Here</a></div>

      <br><br>
     
      Team 
      <br>
      MMCRAZ`,
    }).then((message: any) => {});
  }

  viewOrder() {
    this.router.navigate(["/app/home/orders"]);
  }
  back() {
    this.router.navigate(["/app/home/"]);
  }
}
