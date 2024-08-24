import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginRoutingModule } from "./login-routing.module";
import { SignInComponent } from "./components/sign-in/sign-in.component";

import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { InputNumberModule } from "primeng/inputnumber";
import { SharedModule } from "../shared/shared.module";
import {
  RECAPTCHA_SETTINGS,
  RecaptchaSettings,
  RecaptchaModule,
} from "ng-recaptcha";

@NgModule({
  declarations: [SignInComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ToastModule,
    InputNumberModule,
    SharedModule,
    RecaptchaModule,
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: "6LeXLS4qAAAAAHheIWL9TtNXPenIO3wn2GfXPQ4R", // Replace with your actual site key
      } as RecaptchaSettings,
    },
  ],
})
export class LoginModule {}
