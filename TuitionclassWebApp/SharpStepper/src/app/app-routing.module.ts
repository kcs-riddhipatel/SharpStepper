import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { AuthGuard } from './components/auth/auth.guard';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { CreateroleComponent } from './components/auth/createrole/createrole.component';
import { StudentFormComponent } from './components/student/student-form/student-form.component';
import { StudentDetailsComponent } from './components/student/student-details/student-details.component';
import { HomeComponent } from './components/student/home/home.component';

const routes: Routes = [  
{ path: 'login', component: LoginComponent } , 
{ path: 'registration', component: RegistrationComponent ,canActivate: [AuthGuard]},
{ path: 'header', component: HeaderComponent ,canActivate: [AuthGuard]},
{ path: 'footer', component: FooterComponent ,canActivate: [AuthGuard]},
{ path: 'home', component: HomeComponent ,canActivate: [AuthGuard]},
{ path: 'students', component: StudentListComponent ,canActivate: [AuthGuard]},
{ path: 'createrole', component: CreateroleComponent ,canActivate: [AuthGuard]},
{ path: 'edit/:id', component: StudentFormComponent ,canActivate: [AuthGuard]},
{ path: 'add', component: StudentFormComponent ,canActivate: [AuthGuard]},
{ path: 'details/:id', component: StudentDetailsComponent ,canActivate: [AuthGuard]},
{ path: '', redirectTo: '/students', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
