import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cinema } from '../cinema';
import { CinemaService } from '../cinema.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SeanceService } from 'src/app/seance/seance.service';
import { FilmService } from 'src/app/film/film.service';
import { Film } from 'src/app/film/film';
import { Seance } from 'src/app/seance/seance';

@Component({
  selector: 'app-cinema-select-form',
  templateUrl: './cinema-select-form.component.html',
  styleUrls: ['./cinema-select-form.component.scss']
})
export class CinemaSelectFormComponent implements OnInit {

  cinemaSelectForm: FormGroup;
  errorMessage: string;
  cinemas: Cinema[];

  constructor(private formBuilder: FormBuilder,
              private cinemaService: CinemaService,
              private seanceService: SeanceService,
              public filmService: FilmService,
              private router: Router,
              public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    if (this.filmService.film) {
      this.cinemaService.getCinemaWithFilm(this.filmService.film).then(
        (response: Cinema[]) => {
          this.cinemas = response ? response : [];
        },
        (error) => {
          // FORMAT THIS ERROR MSG
          this.errorMessage = error;
        }
      );
    } else {
      this.cinemaService.getCinemas().then(
        (response: Cinema[]) => {
          this.cinemas = response ? response : [];
        },
        (error) => {
          // FORMAT THIS ERROR MSG
          this.errorMessage = error;
        }
      );
    }
    this.cinemaSelectForm = this.formBuilder.group({
      cinema: [null, [ Validators.required ]] // not used
    });
  }

  onSubmit() {
    // load the cinema
    const cinemaToLoad = this.cinemaSelectForm.get('cinema').value;
    this.cinemaService.cinema = cinemaToLoad;
    this.activeModal.close('Close click');
    this.cinemaService.emitCinema();
    this.filmService.loadFilms();
    this.filmService.emitFilms();
    if (this.filmService.film) {
      this.seanceService.loadSeances();
      this.seanceService.emitSeances();
      this.router.navigate(['/seance']);
    } else {
      this.router.navigate(['/films']);
    }
  }

}
