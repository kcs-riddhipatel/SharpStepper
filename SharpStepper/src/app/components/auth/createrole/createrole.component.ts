import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createrole',
  templateUrl: './createrole.component.html',
  styleUrls: ['./createrole.component.css']
})
export class CreateroleComponent {
  roleName: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  createRole() {
    if (this.roleName) {
      console.log('Role Name:', this.roleName); 
      this.authService.createRole(this.roleName).subscribe({
        next: response => {
          console.log(response);  
          alert('Role created successfully.');
          this.router.navigate(['/students']);
        },
        error: error => {
          console.error(error); 
        }
      });
    } else {
      console.error('Role name is empty.');
    }
  }  
  
  goBack() {
    this.router.navigate(['/students']);
  }
}
