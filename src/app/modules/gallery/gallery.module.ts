import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { GalleryRoutingModule } from "./gallery-routing.module";
import { GalleryListComponent } from "./components/gallery-list/gallery-list.component";
import { GalleryComponent } from "./gallery.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [GalleryListComponent, GalleryComponent],
  imports: [CommonModule, GalleryRoutingModule, SharedModule],
})
export class GalleryModule {}
