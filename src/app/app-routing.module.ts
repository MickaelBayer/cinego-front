import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { CinemaSelectFormComponent } from './cinema/cinema-select-form/cinema-select-form.component';

const routes: Routes = [
  /*{path: 'project/new', component: ProjectFormComponent},
  {path: 'project/:id', component: ProjectBarComponent},
  {path: 'image', canActivate: [AuthGuardService] ,component: ImageComponent},
  {path: 'image/:id', canActivate: [AuthGuardService] ,component: ImageComponent},*/
  {path: 'cinema', canActivate: [AuthGuardService], component: CinemaSelectFormComponent},
  {path: 'home', canActivate: [AuthGuardService], component: HomeComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/signup', component: SignupComponent},
  // redirections
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
