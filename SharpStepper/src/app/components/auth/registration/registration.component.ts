import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AbstractControl, ValidatorFn } from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registerForm: FormGroup;
  roles: string[] = [];
  formSubmitted = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required],
      ConfirmPassword: ['', Validators.required]
     }, {
      validator: this.passwordMatchValidator() 
    });
  } 
  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.get('Password');
      const confirmPassword = control.get('ConfirmPassword');
  
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        return { passwordMismatch: true };
      }  
      return null;
    };
  }

  ngOnInit() {
    this.authService.getRoles().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  register() {
    this.formSubmitted = true;
    this.markFormGroupTouched(this.registerForm);
  
    if (this.registerForm.valid) {
      this.authService.registerUser(this.registerForm.value).subscribe({
        next: (response) => {
          alert("Student created successfully!");
          this.router.navigate(['/students']);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
  
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  goBack() {
    this.router.navigate(['/students']);
  }

  getUsernameControl() {
    return (this.registerForm as FormGroup).get('Username');
  }

  getEmailControl() {
    return (this.registerForm as FormGroup).get('Email');
  }

  getPasswordControl() {
    return (this.registerForm as FormGroup).get('Password');
  }
  getconfirmPasswordControl() {
    return (this.registerForm as FormGroup).get('ConfirmPassword');
  }
}
