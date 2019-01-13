import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CinemaSelectFormComponent } from './cinema-select-form/cinema-select-form.component';
import { CinemaService } from './cinema.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CinemaSelectFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CinemaSelectFormComponent
  ],
  providers: [
    CinemaService
  ],
  entryComponents: [
    CinemaSelectFormComponent
  ]
})

export class CinemaModule { }
