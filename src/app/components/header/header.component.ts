import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CinemaSelectFormComponent } from 'src/app/cinema/cinema-select-form/cinema-select-form.component';
import { CinemaService } from 'src/app/cinema/cinema.service';
import { Cinema } from 'src/app/cinema/cinema';
import { FilmSelectComponent } from 'src/app/film/film-select/film-select.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthSubcription: Subscription;
  isAdminSubscription: Subscription;
  isAuth: boolean;
  isAdmin: boolean;

  cinema: Cinema;
  cinemaSubscription: Subscription;

  constructor(private authService: AuthService,
              private modal: NgbModal,
              private router: Router,
              private cinemaService: CinemaService) { }

  ngOnInit() {
    this.isAuthSubcription = this.authService.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
    this.isAdminSubscription = this.authService.isAdmin$.subscribe(
      (admin) => {
        this.isAdmin = admin;
      }
    );
    this.cinemaSubscription = this.cinemaService.cinemaSubject.subscribe(
      (cinema) => {
        this.cinema = cinema;
      }
    );
    this.cinemaService.emitCinema();
  }

  ngOnDestroy() {
    this.isAuthSubcription.unsubscribe();
    this.isAdminSubscription.unsubscribe();
    this.cinemaSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth', 'login']);
  }

  onCinema() {
    this.modal.open(CinemaSelectFormComponent);
  }

  onCreateSeance() {
    this.modal.open(FilmSelectComponent);
  }
}
