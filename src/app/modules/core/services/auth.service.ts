import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Location } from "@angular/common";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "https://ang-17-be.onrender.com";
  //private apiUrl = "http://localhost:3000";
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private location: Location
  ) {}

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  signUp(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signUp`, user);
  }

  upload(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload`, data);
  }

  getImage(name: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/image?${name}`);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem("loggedIn");
  }

  isLoggedInObser() {
    if (sessionStorage.getItem("loggedIn")) {
      return true;
    } else {
      return false;
    }
  }

  getUserInfo() {
    const user = sessionStorage.getItem("loggedIn");
    if (user) {
      return JSON.parse(user);
    }
  }

  signOut() {
    //document.cookie = "loggedIn" + "=; Max-Age=-99999999;";
    localStorage.clear();
    sessionStorage.clear();
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

  getNewOrders() {
    return this.http.get<any>(`${this.apiUrl}/getNewOrdersList`);
  }
  updateOrders(product: any) {
    return this.http.put<any>(`${this.apiUrl}/updateStatus`, product);
  }

  getUserDataDB(id: any) {
    return this.http.get<any>(`${this.apiUrl}/getUser/${id}`);
  }

  getverifyCaptcha(data: any) {
    return this.http.post<any>(`${this.apiUrl}/verifyCaptcha`, data);
  }
}
