import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Student } from '../../student/student.model';
import { StudentService } from '../../student/student.service';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  newStudents: Student = {
    id: '', firstName: '', lastName: '', email: '', mobile: 0, dob: '', gender: '',
    profileImage: ''
  };
  isAuthenticated: boolean = false;
  isAdmin: boolean;
  isStudent: boolean;
  currentPage: number = 1;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  displayedPages: number[] = [];
  constructor(private router: Router,public authService: AuthService,private studentservice: StudentService,private http: HttpClient){    
  this.isAdmin = this.authService.getUserRoles().includes('Admin');
  this.isStudent = this.authService.getUserRoles().includes('Student');}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.loadStudents(this.currentPage);
  }
  
  loadStudents(page: number): void {
    this.studentservice.getAllStudents(page).subscribe({
      next: async (response: any) => {
        try {
          const students: Student[] = response.students;
          for (const student of students) {
            try {
              const imageArrayBuffer = await firstValueFrom(this.studentservice.getImageUrl(student.profileImage));        
              if (imageArrayBuffer) {
                const imageBlob = new Blob([imageArrayBuffer], { type: 'image/png' }); // Adjust the type as needed
                const imageUrl = URL.createObjectURL(imageBlob);
                student.profileImage = imageUrl;
              } else {
                student.profileImage = '../../../../assets/images/Logo.png';
              }
            } catch (error) {
              console.error(`Error fetching image URL for student: ${error}`);
              student.profileImage = '../../../../assets/images/Logo.png';
            }
          }
          this.students = students;
          debugger
          this.totalPages = response.totalPages;
          this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.calculateDisplayedPages();
        } catch (error) {
          console.error(`Error fetching student images: ${error}`);
        }
      },
      error: (error) => {
        console.error(`Error fetching students: ${error}`);
      }
    });
  }  
  
  calculateDisplayedPages() {
    if (this.totalPages <= 3) {
      this.displayedPages = this.totalPagesArray;
    } else {
      this.displayedPages = [this.currentPage, this.currentPage + 1, this.currentPage + 2];
    }
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadStudents(this.currentPage);
  }
  getImageUrl(imageFileName: string): Observable<string> {
    debugger
    return this.http.get<string>(`https://localhost:7032/api/Student/GetImage?imageFileName=${imageFileName}`);
  }
  admission(){
    this.router.navigate(['/add']);
  }
  editstudent(studentId: string) {
    debugger
    this.router.navigate(['/edit', studentId]);
  }
  getstudentDetails(studentId: string) {
    this.router.navigate(['/details', studentId]);
  }
  deleteStudent(id: string) {
    if (this.isAdmin||this.isStudent) {
      this.studentservice.deletestudent(id).subscribe(() => {
        alert("Student deleted successfully!");
        this.loadStudents(this.currentPage);
      });
    } else {
      alert("You don't have permission to delete employees.");
    } 
  }
}
