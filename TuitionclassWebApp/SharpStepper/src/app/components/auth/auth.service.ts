import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7032';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}
  login(email: string, password: string) {
    const requestData = { Email: email, Password: password };
    return this.http.post<any>(`${this.apiUrl}/login`, requestData).pipe(
      tap((response) => {
        if (response && response.token) {
          localStorage.setItem('access_token', response.token);
          debugger;
          localStorage.setItem('email', response.email);
          localStorage.setItem('role', response.userRoles);
        }
      },(err:HttpErrorResponse)=>{alert("Invalid username & password")})
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getUserRoles(): string[] {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    }
    return [];
  }

  getUsername() {
    const name = localStorage.getItem('email');
    return name;
  }
  getUserRoleName() {
    const role = localStorage.getItem('role');
    return role;
  }
  getRoles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/getRoles`);
  }

  registerUser(registerUser: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerUser);
  }

  createRole(roleName: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/CreateRole?roleName=${roleName}`, null);
  }  

  logout() {
    //localStorage.removeItem('access_token');
    localStorage.clear();
  }
}
