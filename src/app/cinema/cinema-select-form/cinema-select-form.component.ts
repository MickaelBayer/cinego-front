import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cinema } from '../cinema';
import { CinemaService } from '../cinema.service';

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
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.cinemaService.getCinemas().then(
      (response: Cinema[]) => {
        this.cinemas = response ? response : [];
      },
      (error) => {
        // FORMAT THIS ERROR MSG
        this.errorMessage = error;
      }
    );
    this.cinemaSelectForm = this.formBuilder.group({
      cinema: [null, [ Validators.required ]]
    });
  }

  onSubmit() {
    // load the cinema
    const cinemaToLoad = this.cinemaSelectForm.get('cinema').value;
    this.cinemaService.cinema = cinemaToLoad;
    this.cinemaService.emitCinema();
    this.router.navigate(['/cinema', cinemaToLoad.id]);
  }

}
