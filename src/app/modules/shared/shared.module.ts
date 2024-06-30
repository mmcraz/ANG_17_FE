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
import { DragResizeComponent } from "./components/drag-resize/drag-resize.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
@NgModule({
  declarations: [HeaderComponent, FooterComponent, DragResizeComponent],
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
    DragDropModule,
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
    DragResizeComponent,
    DragDropModule,
  ],
})
export class SharedModule {}
