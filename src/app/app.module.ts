import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ImageCropperModule } from "ngx-image-cropper";
import { LoginComponent } from "./modules/login/login.component";
import { CoreModule } from "./modules/core/core.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ToastModule } from "primeng/toast";
import { SharedModule } from "./modules/shared/shared.module";
import { RouterModule, Scroll } from "@angular/router";
import { LoaderService } from "./modules/core/services/loader.service";
import { LoaderInterceptor } from "./modules/core/interceptors/http-interceptor.interceptor";
import { DragDropModule } from "@angular/cdk/drag-drop";

export function scrollToTop(scrollConfig: Scroll): [number, number] {
  return [0, 0];
}

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    DragDropModule,
    ImageCropperModule,
    RouterModule.forRoot([], {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      scrollOffset: [0, 0],

      onSameUrlNavigation: "reload",
    }),
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
