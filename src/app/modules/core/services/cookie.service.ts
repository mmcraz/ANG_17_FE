import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, interval } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CookieService {
  constructor(private http: HttpClient) {}

  // Function to get a specific cookie value by name
  getCookie(name: string): string {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  }

  // Watch for changes in a specific cookie
  watchCookie(name: string): Observable<string> {
    return new Observable<string>((observer) => {
      let currentValue = this.getCookie(name);

      const intervalId = setInterval(() => {
        const newValue = this.getCookie(name);
        if (currentValue !== newValue) {
          observer.next(newValue);
          currentValue = newValue;
        }
      }, 1000); // Adjust the interval as needed

      // Cleanup function
      return () => clearInterval(intervalId);
    });
  }
}
