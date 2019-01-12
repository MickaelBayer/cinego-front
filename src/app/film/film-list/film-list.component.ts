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
  cinema: Cinema;
  cinemaSubscription: Subscription;

  constructor(private filmService: FilmService,
              private cinemaService: CinemaService,
              private router: Router) { }

  ngOnInit() {
    this.cinemaSubscription = this.cinemaService.cinemaSubject.subscribe(
      (cinema: Cinema) => {
        this.cinema = cinema;
      }
    );
    this.cinemaService.emitCinema();
  }

  ngOnDestroy() {

  }


}
