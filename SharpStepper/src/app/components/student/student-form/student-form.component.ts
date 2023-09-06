import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../student/student.model';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  student: Student = {
    id: '', firstName: '', lastName: '', email: '', mobile: 0, dob: '', gender: '',profileImage: ''
  };
  isEditMode: boolean = false;
  formSubmitted: boolean = false;
  constructor(private formBuilder: FormBuilder,
    private studentservice: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      const studentId = params['id'];
      if (studentId) {
        this.isEditMode = true;
        this.studentservice.getstudent(studentId).subscribe(student => {
          this.student = student;
        });
      }
    });
  }
  onSaveStudent() {
    this.formSubmitted = true;

    if (!this.student.firstName || !this.student.lastName || !this.student.email || !this.student.mobile || !this.student.dob || !this.student.gender) {
      return;
    }
    if (this.student.email && !this.student.email.match('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}')) {
      return;
    }
    if (this.student.mobile && (!this.student.mobile.toString().match('[0-9]{1,10}') || this.student.mobile.toString().length > 10)) {
      return;
    }

    const action = this.isEditMode ? 'updated' : 'added';
    const serviceMethod = this.isEditMode ? 'updateStudent' : 'addStudent';
    if (!this.student.id) {
      this.student.id = '00000000-0000-0000-0000-000000000000';
    }
    const formData = new FormData();
    formData.append('id', this.student.id)
    formData.append('firstName', this.student.firstName);
    formData.append('lastName', this.student.lastName);
    formData.append('email', this.student.email);
    formData.append('mobile', this.student.mobile.toString());
    formData.append('dob', this.student.dob.toString());
    formData.append('gender', this.student.gender);
    formData.append('profileImage', this.student.profileImage);
    
    this.studentservice[serviceMethod](formData).subscribe({
      next: student => {
        alert(`Student ${action} successfully!`);
        this.router.navigate(['/students']);
      },
      error: res => {
        console.log(res);
      }
    });
  }

  onImageSelected(event: any): void {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      debugger
      this.student.profileImage = selectedImage;
    }
  }
  goBack() {
    this.router.navigate(['/students']);
  }
}
