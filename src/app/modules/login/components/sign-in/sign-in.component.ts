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

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private authService: AuthService
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

  onSubmit() {
    if (this.loginForm.valid) {
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
              summary: "Error",
              detail: "Successfully Logged In",
            });
            localStorage.setItem("token", JSON.stringify(data));

            if (localStorage.getItem("order")) {
              this.router.navigate(["/app/home/checkout"]);
              return;
            }

            this.router.navigate(["/app/home"]);
          }
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: error.error.message,
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
    if (this.signUpForm.valid) {
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
}
