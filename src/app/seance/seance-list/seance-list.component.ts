import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CinemaService } from 'src/app/cinema/cinema.service';
import { FilmService } from 'src/app/film/film.service';
import { Cinema } from 'src/app/cinema/cinema';
import { Subscription } from 'rxjs';
import { Film } from 'src/app/film/film';
import { Seance } from '../seance';
import { SeanceService } from '../seance.service';
import { Siege } from 'src/app/siege/siege';

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
  seancesSubscription: Subscription;
  errorMessage: string;
  seance: Seance;

  constructor(private router: Router,
              private cinemaService: CinemaService,
              private filmService: FilmService,
              private seanceService: SeanceService) { }

  ngOnInit() {
    // cinema sub
    this.cinemaSubscription = this.cinemaService.cinemaSubject.subscribe(
      (response: Cinema) => {
        this.cinema = response;
      }
    );
    this.cinemaService.emitCinema();
    // film sub
    this.filmSubsctiption = this.filmService.filmSubject.subscribe(
      (response: Film) => {
        this.film = response;
      }
    );
    this.filmService.emitFilm();
    // seance sub
    this.seancesSubscription = this.seanceService.seancesSubject.subscribe(
      (seances) => {
        this.seances = seances;
      }
    );
    this.seanceService.loadSeances();
    this.seanceService.emitSeances();
  }

  ngOnDestroy() {
    this.cinemaSubscription.unsubscribe();
    this.filmSubsctiption.unsubscribe();
    this.seancesSubscription.unsubscribe();
  }

  onLoadSalle(seance) {
    console.log(seance);
  }

}
