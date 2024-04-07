import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Location } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  // private apiUrl = "https://ang-17-be.onrender.com";
  private apiUrl = "http://localhost:3000";
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private location: Location
  ) {}

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  signUp(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signUp`, user);
  }

  isLoggedIn(): boolean {
    return !!this.cookieService.get("loggedIn");
  }

  getUserInfo() {
    const user = this.cookieService.get("loggedIn");
    return JSON.parse(user);
  }

  signOut() {
    // this.cookieService.delete("loggedIn");
    document.cookie = "loggedIn" + "=; Max-Age=-99999999;";
    localStorage.clear();
    this.router.navigate(["/app/login"]);
  }

  saveOrders(order: any) {
    return this.http.post<any>(`${this.apiUrl}/saveOrders`, order);
  }

  getOrders(userId: any) {
    return this.http.get<any>(`${this.apiUrl}/getOrdersList/${userId}`);
  }

  deleteOrder(orderId: any) {
    return this.http.delete<any>(`${this.apiUrl}/delete/${orderId}`);
  }

  permanentDeleteOrder(orderId: any): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/rm/${orderId}`);
  }
}
