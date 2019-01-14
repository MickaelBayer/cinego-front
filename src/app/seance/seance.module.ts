import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SeanceListComponent } from './seance-list/seance-list.component';
import { SeanceService } from './seance.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SiegeModule } from '../siege/siege.module';
import { SiegeSelectFormComponent } from '../siege/siege-select-form/siege-select-form.component';

@NgModule({
  declarations: [
    SeanceListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    SiegeModule
  ],
  exports: [
    SeanceListComponent
  ],
  providers: [
    SeanceService
  ]
})

export class SeanceModule { }
