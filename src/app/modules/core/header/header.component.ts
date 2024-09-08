import { Component, OnInit, ViewChild } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { NavigationEnd, Router } from "@angular/router";
import { filter, Observable, Subscription } from "rxjs";
import { CookieService } from "../services/cookie.service";
import { StorageService } from "../services/storage.service";
import { OverlayPanel } from "primeng/overlaypanel";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
  userInfo: any = [
    {
      firstName: "",
    },
  ];
  isLoggedIn$!: Observable<boolean>;

  storageEvent: { key: string; newValue: string | null } | null = null;
  @ViewChild("op") op!: OverlayPanel;
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

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.op.hide();
      });
  }
  isMenuOpen = false;

  toggleMenu() {
    this.op.hide();
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.op.hide();
    this.isMenuOpen = false;
  }

  signIn() {
    this.router.navigate(["app/login"]);
  }
  signOut() {
    this.authService.signOut(); // Example method from AuthService
    // window.location.reload();
  }

  gotoHome() {
    this.closeMenu();
    this.router.navigate(["app/home"]);
  }

  viewOrders() {
    this.router.navigate(["app/home/orders"]);
  }
  dashboard() {
    this.router.navigate(["app/home/newOrders"]);
  }
  gotoGallery() {
    this.closeMenu();
    this.router.navigate(["app/list"]);
  }
  ngOnDestroy() {
    this.storageSubscription.unsubscribe();
  }
}
