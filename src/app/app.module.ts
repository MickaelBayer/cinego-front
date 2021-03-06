import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { CinemaModule } from './cinema/cinema.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/interceptors/auth-interceptor';
import { FilmModule } from './film/film.module';
import { SeanceModule } from './seance/seance.module';
import { CinemaSelectFormComponent } from './cinema/cinema-select-form/cinema-select-form.component';
import { CommandeModule } from './commande/commande.module';
import { CommandeValidationModalComponent } from './commande/commande-validation-modal/commande-validation-modal.component';
import { FilmSelectComponent } from './film/film-select/film-select.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AuthModule,
    CinemaModule,
    HttpClientModule,
    FilmModule,
    SeanceModule,
    CommandeModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [
    CinemaSelectFormComponent,
    CommandeValidationModalComponent,
    FilmSelectComponent
  ]
})
export class AppModule { }
