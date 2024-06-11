import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CoreRoutingModule } from "./core-routing.module";
import { CoreComponent } from "./core.component";
import { SharedModule } from "../shared/shared.module";
import { GalleryModule } from "../gallery/gallery.module";
@NgModule({
  declarations: [CoreComponent],
  imports: [CommonModule, SharedModule, CoreRoutingModule, GalleryModule],
})
export class CoreModule {}
