import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GalleryListComponent } from "./components/gallery-list/gallery-list.component";

const routes: Routes = [
  {
    path: "list",
    component: GalleryListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GalleryRoutingModule {}
