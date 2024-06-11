import { Component, OnInit } from "@angular/core";
import { tshirts } from "../../../shared/consts/tshirts.const";
import { hoodies } from "../../../shared/consts/hoodies.const";
import { mugs } from "../../../shared/consts/mugs.const";

@Component({
  selector: "app-gallery-list",
  templateUrl: "./gallery-list.component.html",
  styleUrl: "./gallery-list.component.scss",
})
export class GalleryListComponent implements OnInit {
  activeIndex: number = 0;
  tshirts: any[] = [];
  hoodies: any[] = [];
  mugs: any[] = [];
  responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];

  constructor() {}
  ngOnInit(): void {
    this.tshirts = tshirts;
    this.hoodies = hoodies;
    this.mugs = mugs;
  }
}
