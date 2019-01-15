import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommandeValidationComponent } from './commande-validation/commande-validation.component';
import { HttpClient } from '@angular/common/http';
import { CommandeService } from './commande.service';
import { CommandeValidationModalComponent } from './commande-validation-modal/commande-validation-modal.component';

@NgModule({
  declarations: [
    CommandeValidationComponent,
    CommandeValidationModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommandeValidationComponent,
    CommandeValidationModalComponent
  ],
  providers: [
    CommandeService
  ],
  entryComponents: [
    CommandeValidationModalComponent
  ]
})
export class CommandeModule { }
