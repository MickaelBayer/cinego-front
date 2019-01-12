import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmService } from './film.service';
import { FilmListComponent } from './film-list/film-list.component';

@NgModule({
  declarations: [
    FilmListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilmListComponent
  ],
  providers: [
    FilmService
  ]
})
export class FilmModule { }
