import { Injectable } from '@angular/core';
import { Film } from './film';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cinema } from '../cinema/cinema';
import { CinemaService } from '../cinema/cinema.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  film: Film;
  filmSubject = new Subject<Film>();

  films: Film[];
  filmsSubject = new Subject<Film[]>();

  constructor(private http: HttpClient,
              private cinemaService: CinemaService) { }

  emitFilm() {
    this.filmSubject.next(this.film);
  }

  emitFilms() {
    this.filmsSubject.next(this.films);
  }


  /**
   * Charge les films de la BD.
   * Ne charge que les films diffusés dans un cinéma si un est selectionné au préalable
   */
  loadFilms() {
    if (this.cinemaService.cinema) {
      this.http.get('http://127.0.0.1:8282/films/cinema/' + this.cinemaService.cinema.id).subscribe(
        (response: Film[]) => {
          this.films = response ? response : [];
          this.emitFilms();
        },
        (error) => {
          console.log(error);
        });
    } else {
      this.http.get('http://127.0.0.1:8282/films').subscribe(
        (response: Film[]) => {
          this.films = response ? response : [];
          this.emitFilms();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
