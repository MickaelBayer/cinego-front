import { Component, OnInit, OnDestroy } from '@angular/core';
import { FilmService } from '../film.service';
import { CinemaService } from 'src/app/cinema/cinema.service';
import { Router } from '@angular/router';
import { Film } from '../film';
import { Subscription } from 'rxjs';
import { Cinema } from 'src/app/cinema/cinema';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit, OnDestroy {

  films: Film[];
  filmsSubscription: Subscription;
  cinema: Cinema;
  cinemaSubscription: Subscription;
  errorMessage: string;
  date = new Date(); dates = this.date.toString();
  datess = new Date(this.dates);

  constructor(private filmService: FilmService,
              private cinemaService: CinemaService,
              private router: Router) { }

  ngOnInit() {
    this.cinemaSubscription = this.cinemaService.cinemaSubject.subscribe(
      (cinema: Cinema) => {
        this.cinema = cinema;
      }
    );
    this.cinemaService.cinema = null;
    this.cinemaService.emitCinema();
    this.filmsSubscription = this.filmService.filmsSubject.subscribe(
      (films: Film[]) => {
        this.films = films;
      }
    );
    this.filmService.film = null;
    this.filmService.emitFilm();
    this.filmService.loadFilms();
    this.filmService.emitFilms();
  }

  onFooter(film: Film) {
    this.filmService.film = film;
    this.filmService.emitFilm();
    this.router.navigate(['/films', 'details']);
  }

  ngOnDestroy() {
    this.cinemaSubscription.unsubscribe();
    this.filmsSubscription.unsubscribe();
  }


}
