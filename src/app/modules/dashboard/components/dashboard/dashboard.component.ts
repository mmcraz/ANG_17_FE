import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {
  tColors = ["white", "black", "red", "green", "royal_blue"];
  tSizes = ["S", "M", "XL", "XXL", "XXL"];
  pbColors = ["white", "black", "red", "green", "royal_blue"];
  pColors = ["p-white", "p-black", "p-red", "p-green", "p-royal_blue"];

  order = {
    model: "",
    pattern: "",
    text: "1989",
    fsize: 32,
    space: 0,
    size: "",
    ps: 40,
  };

  @ViewChild("tc") tc!: ElementRef;
  @ViewChild("pc") pc!: ElementRef;
  @ViewChild("ts") ts!: ElementRef;
  @ViewChild("ds") ds!: ElementRef;

  constructor(private router: Router, private authService: AuthService) {}
  selectedTc: any = (tc: string) => (
    (this.order.model = tc),
    setTimeout(() =>
      this.pc.nativeElement.scrollIntoView({ behavior: "smooth" })
    )
  );
  selectedPc: any = (pc: string) => (
    (this.order.pattern = "p-" + pc),
    setTimeout(() =>
      this.ts.nativeElement.scrollIntoView({ behavior: "smooth" })
    )
  );
  selectedTs: any = (ts: string) => (
    (this.order.size = ts),
    setTimeout(() =>
      this.ds.nativeElement.scrollIntoView({ behavior: "smooth" })
    )
  );
  inc = () =>
    this.order.fsize < 32
      ? ((this.order.fsize += 8), (this.order.ps -= 15))
      : ((this.order.fsize = 32), (this.order.ps = 40));
  dec = () =>
    this.order.fsize <= 16
      ? ((this.order.fsize = 16), (this.order.ps = 60))
      : ((this.order.fsize -= 8), (this.order.ps += 15));
  getStyle() {
    return {
      "font-size": this.order.fsize + "px",
      top: this.order.ps + "px",
      "letter-spacing": this.order.space + "px",
    };
  }

  signIn() {
    console.log(this.order);
    localStorage.setItem("order", JSON.stringify(this.order));
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(["app/login"]);
      return;
    }
    this.router.navigate(["/app/home/checkout"]);
  }
}
