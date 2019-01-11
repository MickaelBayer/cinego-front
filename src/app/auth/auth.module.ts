import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../app-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    SignupComponent,
    LoginComponent
  ],
  providers: [
    AuthGuardService,
    AuthService
  ]
})
export class AuthModule { }
