import { Injectable } from '@angular/core';
import { Cinema } from './cinema';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Film } from '../film/film';
import { Seance } from '../seance/seance';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {

  cinema: Cinema;
  cinemaSubject = new Subject<Cinema>();

  constructor(private http: HttpClient) { }

  emitCinema() {
    this.cinemaSubject.next(this.cinema);
  }

  /**
   * Get all the cinemas from the DB
   */
  getCinemas() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8282/cinema').subscribe(
        (response) => {
          // an array of cinema
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getCinemaWithFilm(film: Film) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8282/cinema/film/' + film.id ).subscribe(
        (response) => {
          // an array of cinema
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
