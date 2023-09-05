import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../student/student.model';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class StudentService {
    private baseUrl = 'https://localhost:7032/api/Student';
  
    constructor(private http: HttpClient, private router: Router) {} 
     
    // getAllStudents(): Observable<Student[]> {
    //   debugger
    //   return this.http.get<Student[]>(`${this.baseUrl}/GetAllStudents`);
    // }  
    
    getAllStudents(page: number = 1): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/GetAllStudents?page=${page}`);
    }
    // getImageUrl(imageFileName: string): Observable<string> {      
    //   return this.http.get<string>(`${this.baseUrl}/GetImage?imageName=${imageFileName}`);
    // }
    getImageUrl(imageFileName: string): Observable<string> {
      const imageUrl = `https://localhost:7032/api/Student/GetImage?imageName=${imageFileName}`;
      console.log('Image URL:', imageUrl); 
      return this.http.get<string>(imageUrl); 
    }
    addstudent(student: Student): Observable<Student> {
      debugger
      student.id = '00000000-0000-0000-0000-000000000000'; 
      student.profileImage = 'abc.png';
      return this.http.post<Student>(`${this.baseUrl}/AddStudent`, student);
    }
  
    getstudent(id: string): Observable<Student> {
      return this.http.get<Student>(`${this.baseUrl}/GetStudent?id=${id}`);
    }
  
    updatestudent(student: Student): Observable<Student> {
      return this.http.put<Student>(`${this.baseUrl}/UpdateStudent`, student);
    }
  
    deletestudent(id: string): Observable<Student> {
      const result = window.confirm("Are you sure you want to delete this item?");
  
      if (result) {
        return this.http.delete<Student>(`${this.baseUrl}/DeleteStudent?id=${id}`);
      } else {
        return new Observable<Student>(observer => {
          observer.complete();
        });
      }
    } 
}
