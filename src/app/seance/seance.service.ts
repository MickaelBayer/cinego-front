import { Injectable } from '@angular/core';
import { Seance } from './seance';
import { Subject } from 'rxjs';
import { FilmService } from '../film/film.service';
import { CinemaService } from '../cinema/cinema.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {

  seance: Seance;
  seanceSubject = new Subject<Seance>();

  seances: Seance[];
  seancesSubject = new Subject<Seance[]>();

  constructor(private filmService: FilmService,
              private cinemaService: CinemaService,
              private http: HttpClient) { }

  emitSeance() {
    this.seanceSubject.next(this.seance);
  }

  emitSeances() {
    this.seancesSubject.next(this.seances);
  }

  loadSeances() {
    if (this.cinemaService.cinema) {
      this.http.get('http://127.0.0.1:8282/seances/'
                  + this.cinemaService.cinema.id + '/'
                  + this.filmService.film.id)
               .subscribe(
        (seances: Seance[]) => {
          this.seances = seances; console.log(seances);
          this.emitSeances();
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.http.get('http://127.0.0.1:8282/seances/film/'
                  + this.filmService.film.id)
              .subscribe(
        (seances: Seance[]) => {
          this.seances = seances;
          this.emitSeances();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
