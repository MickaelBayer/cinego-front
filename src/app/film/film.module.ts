import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmService } from './film.service';
import { FilmListComponent } from './film-list/film-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { TruncatePipe } from '../tools/truncate.pipe';

@NgModule({
  declarations: [
    FilmListComponent,
    FilmDetailsComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    FilmListComponent,
    FilmDetailsComponent
  ],
  providers: [
    FilmService
  ]
})
export class FilmModule { }
