import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CinemaService } from 'src/app/cinema/cinema.service';
import { FilmService } from 'src/app/film/film.service';
import { Cinema } from 'src/app/cinema/cinema';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/film/film';
import { Seance } from '../seance';
import { SeanceService } from '../seance.service';

@Component({
  selector: 'app-seance-list',
  templateUrl: './seance-list.component.html',
  styleUrls: ['./seance-list.component.scss']
})
export class SeanceListComponent implements OnInit, OnDestroy {

  cinema: Cinema;
  cinemaSubscription: Subscription;
  film: Film;
  filmSubsctiption: Subscription;
  seances: Seance[];
  seanceSubscription: Subscription;
  errorMessage: string;

  constructor(private router: Router,
              private cinemaService: CinemaService,
              private filmService: FilmService,
              private seanceService: SeanceService) { }

  ngOnInit() {
    this.cinemaSubscription = this.cinemaService.cinemaSubject.subscribe(
      (response: Cinema) => {
        this.cinema = response;
      }
    );
    this.cinemaService.emitCinema();
    this.filmSubsctiption = this.filmService.filmSubject.subscribe(
      (response: Film) => {
        this.film = response;
      }
    );
    this.filmService.emitFilm();
    this.seanceService.loadSeances().then(
      (response: Seance[]) => {
        this.seances = response ? response : [];
      },
      (error) => {
        this.errorMessage = error;
      }
    );
    this.seanceService.seances = this.seances;
    /*this.seanceSubscription = this.seanceService.seanceSubject.subscribe(
      (seances: Seance[]) => {
        this.seances = seances;
      }
    );*/
  }

  ngOnDestroy() {
    this.cinemaSubscription.unsubscribe();
    this.filmSubsctiption.unsubscribe();
  }
}
