import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  email: string | null = null;
  constructor(private router: Router, public authService: AuthService) {
    this.email = localStorage.getItem('email');
  }
}
