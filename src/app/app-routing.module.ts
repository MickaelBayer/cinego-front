import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuardService } from './auth/services/auth-guard.service';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { CinemaSelectFormComponent } from './cinema/cinema-select-form/cinema-select-form.component';
import { FilmListComponent } from './film/film-list/film-list.component';
import { FilmDetailsComponent } from './film/film-details/film-details.component';
import { SeanceListComponent } from './seance/seance-list/seance-list.component';
import { CommandeValidationComponent } from './commande/commande-validation/commande-validation.component';

const routes: Routes = [
  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/signup', component: SignupComponent},
  {path: 'cinema', canActivate: [AuthGuardService], component: CinemaSelectFormComponent},
  {path: 'home', canActivate: [AuthGuardService], component: HomeComponent},
  {path: 'films', canActivate: [AuthGuardService], component: FilmListComponent},
  {path: 'films/details', canActivate: [AuthGuardService], component: FilmDetailsComponent},
  {path: 'seance', canActivate: [AuthGuardService], component: SeanceListComponent},
  {path: 'commande', canActivate: [AuthGuardService], component: CommandeValidationComponent},
  // redirections
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
