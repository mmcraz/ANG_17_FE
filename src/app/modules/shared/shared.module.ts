import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedRoutingModule } from "./shared-routing.module";
import { HeaderComponent } from "../core/header/header.component";
import { FooterComponent } from "../core/footer/footer.component";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { SliderModule } from "primeng/slider";
import { DataViewModule } from "primeng/dataview";
import { OverlayPanelModule } from "primeng/overlaypanel";
import { TabViewModule } from "primeng/tabview";
import { BadgeModule } from "primeng/badge";
import { AvatarModule } from "primeng/avatar";
import { GalleriaModule } from "primeng/galleria";
import { CarouselModule } from "primeng/carousel";
import { TagModule } from "primeng/tag";
@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ButtonModule,
    FormsModule,
    SliderModule,
    DataViewModule,
    OverlayPanelModule,
    TabViewModule,
    BadgeModule,
    AvatarModule,
    GalleriaModule,
    CarouselModule,
    TagModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ButtonModule,
    InputTextModule,
    FormsModule,
    SliderModule,
    DataViewModule,
    OverlayPanelModule,
    TabViewModule,
    AvatarModule,
    BadgeModule,
    GalleriaModule,
    CarouselModule,
    TagModule,
  ],
})
export class SharedModule {}
