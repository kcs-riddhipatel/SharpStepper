import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

    onSubmit() {
      debugger
      this.authService.login(this.email, this.password).subscribe(() => {
        debugger
      this.router.navigate(['/home']); 
    });
  }
}
