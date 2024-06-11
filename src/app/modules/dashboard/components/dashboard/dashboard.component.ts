import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {
  tColors = ["white", "black", "red", "green", "royal_blue"];
  hColors = ["black", "royal_blue"];
  tSizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
  pbColors = [
    "white",
    "black",
    "red",
    "green",
    "royal_blue",
    "glitter",
    "metalic",
  ];
  pColors = ["p-white", "p-black", "p-red", "p-green", "p-royal_blue"];
  maxLengthValue = 4;
  spc = 0;

  order = {
    product: "",
    model: "",
    pattern: "",
    text: "1989",
    fsize: 32,
    space: 0,
    size: "",
    ps: 40,
    date: this.getOnlyDate(new Date()),
  };

  orginalTxt = "";
  @ViewChild("tc") tc!: ElementRef;
  @ViewChild("pc") pc!: ElementRef;
  @ViewChild("ts") ts!: ElementRef;
  @ViewChild("ds") ds!: ElementRef;

  responsiveOptions: any[] | undefined;

  products: any = [
    {
      inch: "Chest",
      xs: 18,
      s: 38,
      m: 40,
      l: 42,
      xl: 44,
      xxl: 46,
      xxxl: 48,
    },
    {
      inch: "Length",
      xs: 25,
      s: 26,
      m: 27,
      l: 28,
      xl: 29,
      xxl: 30,
      xxxl: 31,
    },
    {
      inch: "Sleeve",
      xs: 6.5,
      s: 7,
      m: 7.5,
      l: 8,
      xl: 8.5,
      xxl: 9,
      xxxl: 9.5,
    },
  ];

  selectedProduct: any = "";
  productsChoose = [
    { name: "Hoodies", code: "HD" },
    { name: "T-shirt", code: "TS" },
    { name: "Mugs", code: "MG" },
  ];
  banners = [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Printed Hoodies",
      description: "Product Description",
      image: "hoodie.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Printed T-shirts",
      description: "Product Description",
      image: "yours.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Printed Mugs",
      description: "Product Description",
      image: "mug.jpg",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
  ];
  constructor(
    private router: Router,
    private authService: AuthService,
    private datePipe: DatePipe,
    private elementRef: ElementRef
  ) {
    this.orginalTxt = this.order.text;
    this.responsiveOptions = [
      {
        breakpoint: "1199px",
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: "991px",
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: "767px",
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getOnlyDate(date: Date): string {
    return this.datePipe.transform(date, "yyyy-MM-dd")!;
  }

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
  inc() {
    this.order.fsize < 32
      ? ((this.order.fsize += 8),
        (this.order.ps -= 15),
        (this.maxLengthValue -= 1))
      : ((this.order.fsize = 32),
        (this.order.ps = 40),
        (this.maxLengthValue = 4));
  }
  dec() {
    this.order.fsize <= 16
      ? ((this.order.fsize = 16),
        (this.order.ps = 60),
        (this.maxLengthValue = 9))
      : ((this.order.fsize -= 8),
        (this.order.ps += 15),
        (this.maxLengthValue += 1));
  }
  getStyle() {
    return {
      "font-size": this.order.fsize + "px",
      top: this.order.ps + "px",
      "letter-spacing": this.order.space + "px",
    };
  }

  // spaceChange(e: any) {
  //   console.log(e);
  //   if (e.value <= 10 && this.order.fsize == 32) {
  //     let txt = this.order.text;
  //     let pp = txt.slice(0, txt.length - 1);
  //     console.log(pp);
  //     this.order.text = pp;
  //   }
  // }

  setSpace(v: any) {
    switch (v) {
      case 10:
        this.spc = 10;

        //  this.order.text = this.order.text.slice(0, this.order.text.length - 5);
        break;
      case 5:
        this.spc = 5;

        // this.order.text = this.order.text.slice(0, this.order.text.length - 1);
        break;
      case 3:
        this.spc = 3;

        //this.order.text = this.order.text.slice(0, this.order.text.length - 1);
        break;
      case 2:
        this.spc = 2;

        //this.order.text = this.order.text.slice(0, this.order.text.length - 1);
        break;
      default:
        this.spc = 4;

        this.order.text = this.orginalTxt;
        break;
    }
    this.order.space = this.spc;
  }
  getSpace() {
    let spaceValue = [10, 5, 3, 2];
    let vl = spaceValue.includes(this.spc);
    if (vl) {
      return "ls-" + this.spc;
    }

    return "ls-0";
  }

  signIn() {
    localStorage.setItem("order", JSON.stringify(this.order));

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(["app/login"]);
      return;
    }
    this.router.navigate(["/app/home/checkout"]);
  }

  chooseProduct(e: any) {
    this.order.product = e.value.name;
    setTimeout(() => {
      if (e.value.code == "TS") {
        const element = document.getElementById("ts");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        const element =
          document.getElementById("hd") || document.getElementById("mg");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  }
}
