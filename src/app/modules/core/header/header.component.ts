import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { CookieService } from "../services/cookie.service";
import { StorageService } from "../services/storage.service";

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

  storageEvent: { key: string; newValue: string | null } | null = null;
  private storageSubscription: Subscription;

  constructor(
    public authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private storageService: StorageService
  ) {
    // Subscription to listen for changes in the storage service
    this.storageSubscription = this.storageService.storageChanges.subscribe(
      (event) => {
        if (event && typeof event === "object" && event.newValue !== null) {
          // Assuming event is an object with a `newValue` property that can be null
          let newValue = event.newValue;

          try {
            // Parse the JSON string newValue if needed
            let parseData = JSON.parse(newValue);

            if (parseData) {
              // Assuming parseData is an array, assign the first element to userInfo
              this.userInfo = parseData[0];
              console.log("User info updated:", this.userInfo);
            }
          } catch (error) {
            console.error("Error parsing storage event data:", error);
          }
        }
      }
    );
  }

  signIn() {
    this.router.navigate(["app/login"]);
  }
  signOut() {
    this.authService.signOut(); // Example method from AuthService
    // window.location.reload();
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
  ngOnDestroy() {
    this.storageSubscription.unsubscribe();
  }
}
