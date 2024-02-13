import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { CreateroleComponent } from './components/auth/createrole/createrole.component';
import { StudentFormComponent } from './components/student/student-form/student-form.component';
import { StudentDetailsComponent } from './components/student/student-details/student-details.component';
import { HomeComponent } from './components/student/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
export function tokenGetter() {
  return localStorage.getItem('access_token'); 
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    FooterComponent,
    StudentListComponent,
    CreateroleComponent,
    StudentFormComponent,
    StudentDetailsComponent,
    HomeComponent
  ],
  imports: [
    JwtModule.forRoot({
    config: {
      tokenGetter,
      allowedDomains: ['localhost:7032'], 
      disallowedRoutes: []
    }
  }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
