import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {
  userInfo: any = [
    {
      firstName: "",
    },
  ];
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedInObser();
    const info = this.authService.getUserInfo();
    if (info) {
      this.userInfo = info[0];
    }

    // if (this.authService.isLoggedIn()) {
    //   setTimeout(() => {
    //     const info = this.authService.getUserInfo();
    //     this.userInfo = info[0];
    //   }, 1000);

    //   this.isLoggedIn = true;
    // }
  }

  signIn() {
    this.router.navigate(["app/login"]);
  }
  signOut() {
    this.authService.signOut(); // Example method from AuthService
  }

  gotoHome() {
    this.router.navigate(["app/home"]);
  }

  viewOrders() {
    this.router.navigate(["app/home/orders"]);
  }
  dashboard() {
    this.router.navigate(["app/home/newOrders"]);
  }
}
