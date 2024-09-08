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
import {
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
  RecaptchaModule,
} from "ng-recaptcha";
import {
  NgxGoogleAnalyticsModule,
  NgxGoogleAnalyticsRouterModule,
} from "ngx-google-analytics";
import { AboutUsComponent } from './modules/about-us/about-us.component';
import { ContactUsComponent } from './modules/contact-us/contact-us.component';
import { FashionComponent } from './modules/fashion/fashion.component';
import { GiftsComponent } from './modules/gifts/gifts.component';

export function scrollToTop(scrollConfig: Scroll): [number, number] {
  return [0, 0];
}

@NgModule({
  declarations: [AppComponent, LoginComponent, AboutUsComponent, ContactUsComponent, FashionComponent, GiftsComponent],
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
    RecaptchaModule,
    RouterModule.forRoot([], {
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
      scrollOffset: [0, 0],

      onSameUrlNavigation: "reload",
    }),
    NgxGoogleAnalyticsModule.forRoot("G-PXV3MHG1XV"),
    NgxGoogleAnalyticsRouterModule,
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: "6LeXLS4qAAAAAHheIWL9TtNXPenIO3wn2GfXPQ4R", // Replace with your actual site key
      } as RecaptchaSettings,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
