import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SeanceListComponent } from './seance-list/seance-list.component';
import { SeanceService } from './seance.service';
import { NgbAccordion, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SeanceListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [
    SeanceListComponent
  ],
  providers: [
    SeanceService
  ]
})

export class SeanceModule { }
