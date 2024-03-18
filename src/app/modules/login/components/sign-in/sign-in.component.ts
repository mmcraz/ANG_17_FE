import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  providers: [MessageService]
})
export class SignInComponent {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  signUp: boolean = false;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private router: Router, private authService: AuthService) {

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.loginForm.valid) {
      const userInfo = {
        userName: this.loginForm.value.userName,
        password: this.loginForm.value.password
      }
      // Process login form submission
      this.authService.login(userInfo).subscribe((data) => {
        console.log('Login form submitted:', this.loginForm.value);
        if (data) {
          this.messageService.add({ severity: 'success', summary: 'Error', detail: 'Successfully Logged In' });
          localStorage.setItem('token', data)
          this.router.navigate(['/app/dashboard'])
        }
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      })


    } else {
      // Mark all form fields as touched to display validation messages
      this.loginForm.markAllAsTouched();
    }
  }

  signUpFn() {
    this.signUp = !this.signUp;
  }
  onSubmitSignUp() {
    if (this.signUpForm.valid) {
      const userInfo = {
        firstName: this.signUpForm.value.firstName,
        lastName: this.signUpForm.value.lastName,
        email: this.signUpForm.value.email,
        phone: this.signUpForm.value.phone,
      }
      // Process login form submission
      this.authService.signUp(userInfo).subscribe((data) => {
        console.log('signUpForm form submitted:', this.signUpForm.value);
        this.signUpFn()
        // localStorage.setItem('token', data)
        // this.router.navigate(['/app/dashboard'])
      })


    } else {
      // Mark all form fields as touched to display validation messages
      this.signUpForm.markAllAsTouched();
    }
  }


}
