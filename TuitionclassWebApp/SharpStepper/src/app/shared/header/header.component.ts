import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../components/auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  email: string | null = null;
  role:string | null = null;
  isAdmin: boolean;

  constructor(private router: Router, public authService: AuthService) {
    this.email = localStorage.getItem('email');
    this.role = localStorage.getItem('role');
    this.isAdmin = this.authService.getUserRoles().includes('Admin');
  }
  homepage(){
    this.router.navigate(['/home']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
