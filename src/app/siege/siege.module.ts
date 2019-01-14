import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiegeSelectFormComponent } from './siege-select-form/siege-select-form.component';
import { SiegeService } from './siege.service';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SiegeSelectFormComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [
    SiegeSelectFormComponent
  ],
  providers: [
    SiegeService
  ]
})
export class SiegeModule { }
