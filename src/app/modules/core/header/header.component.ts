import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { CookieService } from "../services/cookie.service";

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

  constructor(
    public authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.cookieService.watchCookie("loggedIn").subscribe((value) => {
      let parseData = JSON.parse(value);
      if (parseData) {
        this.userInfo = parseData[0];
      }
    });

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
    window.location.reload();
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
  gotoGallery() {
    this.router.navigate(["app/list"]);
  }
}
