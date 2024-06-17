import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";
import { DatePipe } from "@angular/common";
import { OverlayPanel } from "primeng/overlaypanel";
import { Pricings } from "../../../shared/consts/pricing.const";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent implements OnInit {
  tColors = ["black", "red", "green", "royal_blue"];
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
  pricing = Pricings[0];

  order = {
    product: "",
    model: "",
    pattern: "",
    text1: "",
    text2: "",
    size: "XL",
    template: "",
    price: 0,
    custom: {
      f: "",
      fs: "",
      ls: "",
    },
    date: this.getOnlyDate(new Date()),
  };

  orginalTxt = "";
  @ViewChild("tc") tc!: ElementRef;
  @ViewChild("pc") pc!: ElementRef;
  @ViewChild("ts") ts!: ElementRef;
  @ViewChild("ds") ds!: ElementRef;
  @ViewChild("myinput") myinput!: ElementRef;

  @ViewChild("templatePanel") templatePanel!: OverlayPanel;
  @ViewChild("settingsPanel") settingsPanel!: OverlayPanel;

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
    { name: "Water Bottle", code: "MG" },
  ];

  banners = [
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Printed Hoodies",
      description: "Product Description",
      image: "hoodie.png",
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
      image: "tshirt.png",
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
      image: "mug.png",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1000",
      code: "f230fh0g3",
      name: "Printed Water bottle",
      description: "Product Description",
      image: "bottle.png",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
  ];

  templates = [
    {
      url: "../../../../../assets/img/templates/1.png",
      id: 1,
      tName: "01",
      data: [
        {
          tTop: 70,
          tLeft: 85,
          top: 90,
          left: 140,
          text: "Hello",
          type: 1,
          color: "#ffffff",
          size: 32,
          max: 5,
          weight: "normal",
          width: 90,
          font: "backtoschool",
          space: 0,
        },
      ],
    },
    {
      url: "../../../../../assets/img/templates/2.png",
      id: 2,
      tName: "02",
      data: [
        {
          tTop: 70,
          tLeft: 85,
          top: 90,
          left: 140,
          text: "Hello",
          type: 1,
          color: "#ffffff",
          size: 32,
          max: 5,
          weight: "bold",
          width: 90,
          font: "",
          space: 0,
        },
        {
          tTop: 100,
          tLeft: 85,
          top: 120,
          left: 140,
          text: "mmcraz",
          type: 2,
          color: "rgb(255 200 0)",
          size: 18,
          max: 5,
          weight: "bold",
          width: 90,
          font: "",
          space: 2,
        },
      ],
    },
    {
      url: "../../../../../assets/img/templates/3.png",
      id: 3,
      tName: "01",
      data: [
        {
          tTop: 70,
          tLeft: 85,
          top: 90,
          left: 140,
          text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          type: 3,
          color: "#ffffff",
          size: 12,
          max: 50,
          weight: "normal",
          width: 90,
          height: 90,
          font: "creattion",
          space: 0,
        },
      ],
    },
  ];
  templatesCopy = [...this.templates];
  fonts = [
    { name: "font1", code: "backtoschool" },
    { name: "font2", code: "Beadwork" },
    { name: "font3", code: "RUSTED" },
    { name: "font4", code: "rooster" },
    { name: "font5", code: "honey" },
    { name: "font6", code: "creattion" },
  ];
  fontsizeOptions = [
    { name: "8pt", code: "8" },
    { name: "12pt", code: "12" },
    { name: "14pt", code: "14" },
    { name: "16pt", code: "16" },
    { name: "18pt", code: "18" },
    { name: "24pt", code: "24" },
    { name: "28pt", code: "28" },
    { name: "32pt", code: "32" },
  ];
  letterSpaceOptions = [
    { name: "0", code: "0" },
    { name: "1px", code: "1" },
    { name: "2px", code: "2" },
    { name: "3px", code: "3" },
    { name: "4px", code: "4" },
    { name: "5px", code: "5" },
    { name: "6px", code: "6" },
    { name: "7px", code: "7" },
    { name: "8px", code: "8" },
    { name: "9px", code: "9" },
  ];

  typeOne!: string;
  typeTwo: string = "";
  typeThree: string = "";
  typeFour: string = "";
  showGuidelines: boolean = false;
  selectedFont = "backtoschool";
  selectedFontSize = "16";
  selectedLetterSpace = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private datePipe: DatePipe,
    private elementRef: ElementRef
  ) {
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

  selectedTc(tc: string) {
    this.order.model = tc;
  }

  selectedPc(pc: string) {
    this.order.pattern = "p-" + pc;
  }

  selectedTs(ts: string) {
    this.order.size = ts;
  }
  selectedPct: any = (pc: string) => (this.order.pattern = "p-" + pc);

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

  whatsapp: any;
  whatsappOrder: any;
  setOrder() {
    if (this.selectedTemplate.tName !== "01") {
      this.order.pattern = "";
    }
    this.order.template = this.selectedTemplate.tName;
    this.order.text1 = this.selectedTemplate.data[0].text;
    this.order.text2 = this.selectedTemplate.data[1].text;
  }
  whatsApp() {
    localStorage.setItem("order", JSON.stringify(this.order));

    this.whatsappOrder =
      "*" +
      encodeURIComponent(this.order.product) +
      "*%0a" +
      "%20Color%20" +
      "*" +
      encodeURIComponent(this.order.model) +
      "*%0a" +
      "%20Size%20" +
      "*" +
      encodeURIComponent(this.order.size) +
      "*%0a" +
      "%20Template%20" +
      "*" +
      encodeURIComponent(this.order.template) +
      "*%0a" +
      "%20Text1%20" +
      "*" +
      encodeURIComponent(this.order.text1) +
      "*%0a" +
      "%20Text2%20" +
      "*" +
      encodeURIComponent(this.order.text2) +
      "*%0a" +
      "%20Pattern%20" +
      "*" +
      encodeURIComponent(this.order.pattern) +
      "*%0a" +
      "%20Final Price%20" +
      "*" +
      encodeURIComponent(this.order.price) +
      "*%0a" +
      "%20Settings%20" +
      "*" +
      encodeURIComponent(
        this.order.custom.f +
          "/" +
          this.order.custom.fs +
          "/" +
          this.order.custom.ls
      ) +
      "*";

    this.whatsapp =
      "https://wa.me/9566221663?text= Please Confirm Your Order! %0a%0a" +
      this.whatsappOrder +
      "%0a%0a%0a" +
      "Press *send* button to confirm.";
  }

  chooseProduct(e: any) {
    this.order.product = e.value.name;
    this.order.model = "black";
    this.resetSettings();
    setTimeout(() => {
      if (e.value.code == "TS") {
        this.pricing = Pricings[1];
        this.order.price = this.pricing.offerPrice;
        const element = document.getElementById("ts");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        this.pricing = Pricings[0];
        this.order.price = this.pricing.offerPrice;
        const element =
          document.getElementById("hd") || document.getElementById("mg");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  }

  selectedTemplate: any = this.templatesCopy[0];
  selectTemplate(t: any) {
    this.selectedTemplate = t;
    this.resetSettings();
    if (this.selectedTemplate.tName == "02") {
      this.order.pattern = "";
    }
  }

  resetSettings() {
    this.selectedFontSize = "auto";
    this.selectedLetterSpace = 0;
    this.selectedFont = "auto";
  }

  toggleGuidelines() {
    this.showGuidelines = !this.showGuidelines;
  }

  templatePanels(e: any) {
    this.templatePanel.toggle(e);
    this.settingsPanel.hide();
  }

  settingsPanels(e: any) {
    this.settingsPanel.toggle(e);
    this.templatePanel.hide();
  }

  chooseFont(e: any) {
    this.order.custom.f = "f" + e.value.code;
    this.selectedTemplate.data.map((d: any) => {
      d.font = e.value.code;
    });
  }

  chooseFontSize(e: any) {
    this.order.custom.fs = "fs" + e.value.code;
    this.selectedTemplate.data.map((d: any) => {
      d.size = e.value.code;
    });
  }

  chooseLetterSpace(e: any) {
    this.order.custom.ls = "ls" + e.value.code;
    this.selectedTemplate.data.map((d: any) => {
      d.space = e.value.code;
    });
  }

  ngOnInit(): void {
    if (this.myinput) {
      this.myinput.nativeElement.focus();
    }
  }
}
