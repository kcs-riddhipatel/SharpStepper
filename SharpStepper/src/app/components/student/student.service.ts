import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Student } from '../student/student.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'https://localhost:7032/api/Student';

  constructor(private http: HttpClient, private router: Router) { }

  getAllStudents(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetAllStudents?page=${page}`);
  }

  getImageUrl(imageFileName: string): Observable<ArrayBuffer> {
    const imageUrl = `https://localhost:7032/api/Student/GetImage?imageName=${imageFileName}`;
    console.log('Image URL:', imageUrl);
    return this.http.get(imageUrl, { responseType: 'arraybuffer' });
  }

  addStudent(formData: FormData): Observable<Student> {
    debugger
    return this.http.post<Student>(`${this.baseUrl}/AddStudent`, formData)
      .pipe(
        catchError((error: any) => {
          console.error('Error adding student:', error);
          return throwError(() => error);
        })
      );
  }
  getstudent(id: string): Observable<Student> {
    return this.http.get<Student>(`${this.baseUrl}/GetStudent?id=${id}`);
  }

  updateStudent(formData: FormData): Observable<Student> {
    debugger
    return this.http.put<Student>(`${this.baseUrl}/UpdateStudent`, formData)
      .pipe(
        catchError((error: any) => {
          console.error('Error updating student:', error);
          return throwError(() => error);
        })
      );
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
