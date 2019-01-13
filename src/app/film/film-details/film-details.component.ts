import { Component, OnInit, OnDestroy } from '@angular/core';
import { Film } from '../film';
import { Subscription } from 'rxjs';
import { FilmService } from '../film.service';
import { Router } from '@angular/router';
import { CinemaService } from 'src/app/cinema/cinema.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CinemaSelectFormComponent } from 'src/app/cinema/cinema-select-form/cinema-select-form.component';

@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent implements OnInit, OnDestroy {

  film: Film;
  filmSubscription: Subscription;

  constructor(private filmService: FilmService,
              private cinemaService: CinemaService,
              private modal: NgbModal,
              private router: Router) { }

  ngOnInit() {
    this.filmSubscription = this.filmService.filmSubject.subscribe(
      (film: Film) => {
        this.film = film;
      }
    );
    this.filmService.emitFilm();
  }

  ngOnDestroy() {
    this.filmSubscription.unsubscribe();
  }

  onSeances() {
    if (this.cinemaService.cinema) {
      // load les seances a partir seance service
      this.router.navigate(['/seance']);
    } else {
      // choisir un cinema, ce qui redirigera sur les seances
      this.modal.open(CinemaSelectFormComponent);
    }
  }
}
