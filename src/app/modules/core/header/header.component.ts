import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

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
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      setTimeout(() => {
        const info = this.authService.getUserInfo();
        this.userInfo = info[0];
      }, 1000);

      this.isLoggedIn = true;
    }
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
}
