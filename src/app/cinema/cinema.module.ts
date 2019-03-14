import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CinemaSelectFormComponent } from './cinema-select-form/cinema-select-form.component';
import { CinemaService } from './cinema.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CinemaCreateFormComponent } from './cinema-create-form/cinema-create-form.component';

@NgModule({
  declarations: [
    CinemaSelectFormComponent,
    CinemaCreateFormComponent
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
