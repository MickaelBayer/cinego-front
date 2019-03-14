import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FilmService } from '../film.service';
import { Film } from '../film';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-film-select',
  templateUrl: './film-select.component.html',
  styleUrls: ['./film-select.component.scss']
})
export class FilmSelectComponent implements OnInit {

  filmSaisieForm: FormGroup;

  allFilms: Film[];
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public activeModal: NgbActiveModal,
              private filmService: FilmService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.filmService.loadAllFilms().then(
      (response: Film[]) => {
        this.allFilms = response ? response : [];
      },
      (error) => {
        // FORMAT THIS ERROR MSG
        this.errorMessage = error;
      }
    );
    this.filmSaisieForm = this.formBuilder.group({
      filmConnu: [null] ,
      titre: [null]
    });
  }

  onSubmit() {
    const titre = this.filmSaisieForm.get('titre').value;
    const filmConnu = this.filmSaisieForm.get('filmConnu').value;
    if (titre) {
      console.log(titre);
    } else if (filmConnu) {
      console.log(filmConnu);
    }
  }

}
