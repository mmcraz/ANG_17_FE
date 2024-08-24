import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";

import { MessageService } from "primeng/api";
import { CookieService } from "ngx-cookie-service";
import { LoaderService } from "../../../core/services/loader.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrl: "./sign-in.component.scss",
  providers: [MessageService],
})
export class SignInComponent {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  signUp: boolean = false;
  captchaResponse: string = "";
  captchaResolved: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    public loaderService: LoaderService
  ) {
    this.loginForm = this.formBuilder.group({
      userName: ["", Validators.required],
      password: ["", Validators.required],
    });

    this.signUpForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", Validators.required],
        addressOne: ["", Validators.required],
        addressTwo: ["", Validators.required],
        // city: ["", Validators.required],
        // state: ["", Validators.required],
        pin: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6),
          ],
        ],
        confirmPassword: ["", Validators.required],
        phone: [
          "",
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(signUpForm: FormGroup) {
    const password = signUpForm.get("password")?.value;
    const confirmPassword = signUpForm.get("confirmPassword")?.value;

    if (password !== confirmPassword) {
      signUpForm.get("confirmPassword")?.setErrors({ mismatch: true });
      return;
    } else {
      return null;
    }
  }
  // Convenience getter for easy access to form controls
  get f() {
    return this.signUpForm.controls;
  }

  resetForm() {
    // Reset the form
    this.signUpForm.reset();
    this.loginForm.reset();
  }

  getCookie() {
    const value = this.cookieService.get("loggedIn");
    console.log(value);
  }
  onSubmit() {
    if (this.loginForm.valid) {
      // this.loaderService.show();
      const userInfo = {
        userName: this.loginForm.value.userName,
        password: this.loginForm.value.password,
      };

      // Process login form submission
      this.authService.login(userInfo).subscribe(
        (data) => {
          console.log("Login form submitted:", this.loginForm.value);
          if (data) {
            this.messageService.add({
              severity: "success",
              summary: "Success",
              detail: "Successfully Logged In",
            });
            //  this.loaderService.hide();
            sessionStorage.setItem("loggedIn", JSON.stringify(data));
            // const expirationDate = new Date();
            //expirationDate.setHours(23, 59, 59, 0); // Set time to 23:59:5

            // document.cookie =
            //   "loggedIn" +
            //   "=" +
            //   JSON.stringify(data) +
            //   ";" +
            //   expirationDate +
            //   ";path=/app";

            if (localStorage.getItem("order")) {
              this.router.navigate(["/app/home/checkout"]);
              return;
            }
            this.router.navigate(["/app/home"]);
          }
        },
        (error) => {
          //  this.loaderService.hide();
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail:
              error?.error?.message || error?.message || "Something Went Wrong",
          });
        }
      );
    } else {
      // Mark all form fields as touched to display validation messages
      this.loginForm.markAllAsTouched();
    }
  }

  signUpFn() {
    this.signUp = !this.signUp;
    this.resetForm();
  }
  onSubmitSignUp() {
    if (this.signUpForm.valid && this.captchaResponse) {
      const userInfo = {
        firstName: this.signUpForm.value.firstName,
        lastName: this.signUpForm.value.lastName,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
        confirmPassword: this.signUpForm.value.confirmPassword,
        phone: this.signUpForm.value.phone,
      };
      // Process login form submission
      this.authService.signUp(userInfo).subscribe((data) => {
        console.log("signUpForm form submitted:", this.signUpForm.value);
        this.signUpFn();
        // localStorage.setItem('token', data)
        // this.router.navigate(['/app/dashboard'])
      });
    } else {
      // Mark all form fields as touched to display validation messages
      this.signUpForm.markAllAsTouched();
    }
  }

  onCaptchaResolved(captchaResponse: any) {
    if (!captchaResponse) {
      this.captchaResolved = false;
    }

    this.captchaResponse = captchaResponse;

    let tokenDetails = {
      token: captchaResponse,
    };

    this.authService.getverifyCaptcha(tokenDetails).subscribe((res) => {
      if (res.success) {
        this.captchaResolved = !!captchaResponse;
      }
    });
  }
}
