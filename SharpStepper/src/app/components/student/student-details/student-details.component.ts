import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Student } from '../../student/student.model';
import { StudentService } from '../../student/student.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit{
  student: Student | null = null;
  students: Student[] = [];
  newStudents: Student = {
    id: '', firstName: '', lastName: '', email: '', mobile: 0, dob: '', gender: '',
    profileImage: ''
  };
  isAuthenticated: boolean = false;
  isAdmin: boolean;
  isStudent: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,public authService: AuthService,private studentservice: StudentService
  ) {
  this.isAdmin = this.authService.getUserRoles().includes('Admin');
  this.isStudent = this.authService.getUserRoles().includes('Student');}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated(); 
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentservice.getstudent(id).subscribe((student) => {
        this.student = student;
      });
    }
  }
  loadStudents() {
    this.studentservice.getAllStudents().subscribe((students: Student[]) => {
      this.students = students;
    });
  }
  editstudent(studentId: string) {
    if (this.isAdmin||this.isStudent){
    this.router.navigate(['/edit', studentId]);}
    else{
      alert("You don't have permission to update student.");
    }
  }
  deleteStudent(id: string) {
    if (this.isAdmin||this.isStudent) {
      this.studentservice.deletestudent(id).subscribe(() => {
        alert("Student deleted successfully!");
        this.loadStudents();
      });
    } else {
      alert("You don't have permission to delete student.");
    } 
  }
  goBack() {
    this.router.navigate(['/students']);
  }
}
