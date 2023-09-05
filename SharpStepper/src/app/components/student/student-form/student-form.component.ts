import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import {ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../student/student.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit{
  student: Student = {
    id: '', firstName: '', lastName: '', email: '', mobile: 0, dob: '', gender: '',
    profileImage: ''
  };
  isEditMode: boolean = false;
  formSubmitted:boolean= false;
  constructor(private formBuilder: FormBuilder,
    private studentservice: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

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
  debugger
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
  const serviceMethod = this.isEditMode ? 'updatestudent' : 'addstudent';

  this.studentservice[serviceMethod](this.student).subscribe({
    next: student => {
      alert(`Student ${action} successfully!`);
      this.router.navigate(['/students']);
    },
    error: res => {
      console.log(res);
    }
  });
}
  goBack() {
    this.router.navigate(['/students']);
  }
}
