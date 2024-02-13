import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListComponent } from '../student-list/student-list.component';

describe('StudentListComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentListComponent]
    });
    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});