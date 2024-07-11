import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../../core/services/auth.service";
import { DatePipe } from "@angular/common";
import { OverlayPanel } from "primeng/overlaypanel";
import { Pricings } from "../../../shared/consts/pricing.const";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Dimensions,
  ImageCroppedEvent,
  ImageTransform,
} from "ngx-image-cropper";
import { DomSanitizer } from "@angular/platform-browser";
interface DraggableItem {
  rotation: number;
  x: number;
  y: number;
}

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
    pcolor: "white",
    pattern: "",
    text1: "",
    text2: "",
    size: "XL",
    template: "",
    price: 0,
    settings: {
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
  @ViewChild("printAsPdf") printAsPdf!: ElementRef;
  @ViewChild("printAsPdfBottle") printAsPdfBottle!: ElementRef;
  @ViewChild("printAsPdfMouse") printAsPdfMouse!: ElementRef;

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
    { name: "Water Bottle", code: "BT" },
    // { name: "Caps", code: "CS" },
    // { name: "Stickers/Labels", code: "CS" },
    { name: "Mouse Pads", code: "MP" },
    // { name: "Photo Frames", code: "CS" },
    // { name: "Gaphic Designing", code: "MG" },
    // { name: "Photo Editing", code: "MG" },
    // { name: "Logo Designing", code: "MG" },
    // { name: "Web Designing", code: "MG" },
    // { name: "Web Development", code: "MG" },
  ];

  banners = [
    {
      id: "1000",
      code: "HD",
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
      code: "TS",
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
      code: "MG",
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
      code: "BT",
      name: "Printed Water bottle",
      description: "Product Description",
      image: "bottle.png",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1000",
      code: "SR",
      name: "Printed Stickers/Labels",
      description: "Product Description",
      image: "sticker.png",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1000",
      code: "MP",
      name: "Printed Mouse Pads",
      description: "Product Description",
      image: "mousepad.png",
      price: 65,
      category: "Accessories",
      quantity: 24,
      inventoryStatus: "INSTOCK",
      rating: 5,
    },
    {
      id: "1000",
      code: "CP",
      name: "Printed Caps",
      description: "Product Description",
      image: "caps.png",
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
          left: 130,
          text: "Hello",
          type: 1,
          color: "#ffffff",
          size: 32,
          max: 5,
          weight: "normal",
          width: 100,
          tWidth: 90,
          font: "backtoschool",
          space: 0,
          height: 100,
          wb: "break-word",
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
          left: 130,
          text: "Hello",
          type: 1,
          color: "#ffffff",
          size: 32,
          max: 5,
          weight: "bold",
          width: 100,
          tWidth: 90,
          font: "",
          space: 0,
          height: 40,
          wb: "break-word",
        },
        {
          tTop: 109,
          tLeft: 85,
          top: 130,
          left: 130,
          text: "mmcraz",
          type: 2,
          color: "rgb(255 200 0)",
          size: 18,
          max: 5,
          weight: "bold",
          width: 100,
          tWidth: 90,
          font: "",
          space: 2,
          height: 40,
          wb: "break-word",
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
          left: 130,
          text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
          type: 3,
          color: "#ffffff",
          size: 12,
          max: 50,
          weight: "normal",
          width: 100,
          tWidth: 90,
          height: 100,
          font: "creattion",
          space: 0,
          wb: "break-word",
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

  imageChangedEvent: any = "";
  croppedImage: any = "";
  canvasRotation = 0;
  rotation?: number;
  translateH = 0;
  translateV = 0;
  scale = 1;
  aspectRatio = 16 / 5;
  showCropper = false;
  containWithinAspectRatio = false;
  transform: ImageTransform = {
    translateUnit: "px",
  };
  imageURL?: string;
  loading = false;
  allowMoveImage = false;
  hidden = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private datePipe: DatePipe,
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer
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
    this.order.pcolor = tc;
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

    localStorage.setItem("order", JSON.stringify(this.order));
  }
  whatsApp() {
    this.whatsappOrder =
      "*" +
      encodeURIComponent(this.order.product) +
      "*%0a" +
      "%20Color%20" +
      "*" +
      encodeURIComponent(this.order.pcolor) +
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
        this.order.settings.f +
          "/" +
          this.order.settings.fs +
          "/" +
          this.order.settings.ls
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
    if (this.selectedProduct.code == "MG") {
      this.order.pcolor = "white";
      this.aspectRatio = 5 / 2;
    } else {
      this.order.pcolor = "black";
    }

    if (this.selectedProduct.code == "BT") {
      this.order.pcolor = "white";
      this.aspectRatio = 23 / 18;
    }

    if (this.selectedProduct.code == "MP") {
      this.order.pcolor = "white";
      this.aspectRatio = 9 / 9;
    }

    this.resetSettings();
    setTimeout(() => {
      if (e.value.code == "TS") {
        this.pricing = Pricings[1];
        this.order.price = this.pricing.offerPrice;
        const element = document.getElementById("ts");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else if (e.value.code == "HD") {
        this.pricing = Pricings[0];
        this.order.price = this.pricing.offerPrice;
        const element =
          document.getElementById("hd") || document.getElementById("mg");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else if (e.value.code == "MG") {
        this.pricing = Pricings[2];
        this.order.price = this.pricing.offerPrice;
        const element =
          document.getElementById("hd") || document.getElementById("mg");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else if (e.value.code == "BT") {
        this.pricing = Pricings[2];
        this.order.price = this.pricing.offerPrice;
        const element =
          document.getElementById("bt") || document.getElementById("bt");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else if (e.value.code == "MP") {
        this.pricing = Pricings[2];
        this.order.price = this.pricing.offerPrice;
        const element =
          document.getElementById("mp") || document.getElementById("mp");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        this.pricing = Pricings[2];
        this.order.price = this.pricing.offerPrice;
        const element =
          document.getElementById("hd") || document.getElementById("cs");
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
    this.order.settings.f = "f" + e.value.code;
    this.selectedTemplate.data.map((d: any) => {
      d.font = e.value.code;
    });
  }

  chooseFontSize(e: any) {
    this.order.settings.fs = "fs" + e.value.code;
    this.selectedTemplate.data.map((d: any) => {
      d.size = e.value.code;
    });
  }

  chooseLetterSpace(e: any) {
    this.order.settings.ls = "ls" + e.value.code;
    this.selectedTemplate.data.map((d: any) => {
      d.space = e.value.code;
    });
  }
  editText: any;
  editTextTwo: any;
  displayText: any;
  displayTextTwo: any;
  openEditPanel() {}
  save() {}

  generatePDF() {
    const doc = new jsPDF();
    let content;
    if (this.selectedProduct.code == "MG") {
      content = this.printAsPdf.nativeElement;
    }

    if (
      this.selectedProduct.code == "BT" ||
      this.selectedProduct.code == undefined
    ) {
      content = this.printAsPdfBottle.nativeElement;
    }

    if (
      this.selectedProduct.code == "MP" ||
      this.selectedProduct.code == undefined
    ) {
      content = this.printAsPdfMouse.nativeElement;
    }

    content.classList.add("bg");

    const childDivs = content.querySelectorAll("span");
    childDivs.forEach((div: HTMLElement) => {
      div.style.border = "none";
    });

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // mm
      const pageHeight = 295; // mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      doc.save("final_product.pdf");
    });
  }

  items: DraggableItem[] = []; // Typed array
  maxItems = 5;
  addItem() {
    if (this.items.length < this.maxItems) {
      this.items.push({ rotation: 0, x: 0, y: 0 });
    } else {
      console.log("Maximum number of items reached.");
      // Optionally, you can display a message or handle the limitation accordingly.
    }
  }

  deleteItem(index: number) {
    this.items.splice(index, 1);
  }

  updatePosition(index: number, newPosition: { x: number; y: number }) {
    this.items[index].x = newPosition.x;
    this.items[index].y = newPosition.y;
  }

  // updateRotation(index: number, rotation: number) {
  //   this.items[index].rotation = rotation;
  // }
  trackByFn(index: any, item: any) {
    return index;
  }

  fileChangeEvent(event: any): void {
    this.loading = true;
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl || event.base64 || ""
    );
    console.log(event);
    if (event.objectUrl) {
      this.order.pattern = event.objectUrl;
    }
  }

  imageLoaded() {
    this.showCropper = true;
    console.log("Image loaded");
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log("Cropper ready", sourceImageDimensions);
    this.loading = false;
  }

  loadImageFailed() {
    console.error("Load image failed");
  }

  rotateLeft() {
    this.loading = true;
    setTimeout(() => {
      // Use timeout because rotating image is a heavy operation and will block the ui thread
      this.canvasRotation--;
      this.flipAfterRotate();
    });
  }

  rotateRight() {
    this.loading = true;
    setTimeout(() => {
      this.canvasRotation++;
      this.flipAfterRotate();
    });
  }

  moveLeft() {
    this.transform = {
      ...this.transform,
      translateH: ++this.translateH,
    };
  }

  moveRight() {
    this.transform = {
      ...this.transform,
      translateH: --this.translateH,
    };
  }

  moveTop() {
    this.transform = {
      ...this.transform,
      translateV: ++this.translateV,
    };
  }

  moveBottom() {
    this.transform = {
      ...this.transform,
      translateV: --this.translateV,
    };
  }

  private flipAfterRotate() {
    const flippedH = this.transform.flipH;
    const flippedV = this.transform.flipV;
    this.transform = {
      ...this.transform,
      flipH: flippedV,
      flipV: flippedH,
    };
    this.translateH = 0;
    this.translateV = 0;
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH,
    };
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV,
    };
  }

  resetImage() {
    this.scale = 1;
    this.rotation = 0;
    this.canvasRotation = 0;
    this.transform = {
      translateUnit: "px",
    };
  }

  zoomOut() {
    this.scale -= 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  zoomIn() {
    this.scale += 0.1;
    this.transform = {
      ...this.transform,
      scale: this.scale,
    };
  }

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }

  updateRotation() {
    this.transform = {
      ...this.transform,
      rotate: this.rotation,
    };
  }

  toggleAspectRatio() {
    this.aspectRatio = this.aspectRatio === 4 / 3 ? 16 / 5 : 4 / 3;
  }

  rotateMugDeg: number = 0;

  rotateMug() {
    if (this.rotateMugDeg == 2) {
      this.rotateMugDeg = 0;
      return;
    }
    this.rotateMugDeg += 1;
  }

  ngOnInit(): void {
    if (this.myinput) {
      this.myinput.nativeElement.focus();
    }
  }
}
