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

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ButtonModule,
    FormsModule,
    SliderModule,
    DataViewModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ButtonModule,
    InputTextModule,
    FormsModule,
    SliderModule,
    DataViewModule,
  ],
})
export class SharedModule {}
