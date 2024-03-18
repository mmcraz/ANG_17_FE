import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  signUp(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signUp`, user);
  }


  isLoggedIn(): boolean {
    // Your authentication logic here
    // For example, check if user is logged in
    return !!localStorage.getItem('token'); // Assuming you have a token in localStorage
  }

  signOut(): void {
    // Clear user authentication tokens or perform any necessary cleanup
    // For example:
    localStorage.removeItem('token');
    // Redirect the user to the sign-in page
    this.router.navigate(['/app/login']);

  }


}
