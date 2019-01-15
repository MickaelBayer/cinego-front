import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Commande } from '../commande';
import { CommandeService } from '../commande.service';
import { SiegeService } from 'src/app/siege/siege.service';

@Component({
  selector: 'app-commande-validation-modal',
  templateUrl: './commande-validation-modal.component.html',
  styleUrls: ['./commande-validation-modal.component.scss']
})
export class CommandeValidationModalComponent implements OnInit {


  constructor(private router: Router,
              public activeModal: NgbActiveModal,
              private commandeService: CommandeService,
              private siegeService: SiegeService) { }

  ngOnInit() {
  }

  onPaye() {
    // Save the commande
    // Save sieges
    // Go to films
    console.log(this.commandeService.commande);
    this.commandeService.updateUserCommand().then(
      () => {console.log(this.commandeService.commande);
        this.commandeService.saveCommande().then(
        () => {
          this.siegeService.validResa();
          this.siegeService.saveSieges().then(
            () => {
              this.activeModal.close('Close click');
              this.router.navigate(['/films']);
            }
          );
        });
      }
    );
  }

}
