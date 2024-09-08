import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoreComponent } from "./modules/core/core.component";
import { NoPageFoundComponent } from "./modules/core/no-page-found/no-page-found.component";
import { AboutUsComponent } from "./modules/about-us/about-us.component";
import { ContactUsComponent } from "./modules/contact-us/contact-us.component";
import { FashionComponent } from "./modules/fashion/fashion.component";
import { GiftsComponent } from "./modules/gifts/gifts.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "app/home",
    pathMatch: "full",
  },
  {
    path: "app/about-us",
    component: AboutUsComponent,
  },
  {
    path: "app/contact-us",
    component: ContactUsComponent,
  },
  {
    path: "app/fashion",
    component: FashionComponent,
  },
  {
    path: "app/gifts",
    component: GiftsComponent,
  },
  {
    path: "app",
    component: CoreComponent,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("./modules/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
    ],
  },
  {
    path: "app",
    loadChildren: () =>
      import("./modules/login/login.module").then((m) => m.LoginModule),
  },

  {
    path: "app",
    loadChildren: () =>
      import("./modules/gallery/gallery.module").then((m) => m.GalleryModule),
  },

  {
    path: "**",
    component: NoPageFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
