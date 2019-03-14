import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilmService } from './film.service';
import { FilmListComponent } from './film-list/film-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { TruncatePipe } from '../tools/truncate.pipe';
import { FilmSelectComponent } from './film-select/film-select.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FilmListComponent,
    FilmDetailsComponent,
    TruncatePipe,
    FilmSelectComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    FilmListComponent,
    FilmDetailsComponent,
    FilmSelectComponent
  ],
  providers: [
    FilmService
  ]
})
export class FilmModule { }
