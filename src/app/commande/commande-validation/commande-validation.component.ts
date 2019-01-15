import { Component, OnInit, OnDestroy } from '@angular/core';
import { Siege } from 'src/app/siege/siege';
import { Subscription } from 'rxjs';
import { SiegeService } from 'src/app/siege/siege.service';
import { CommandeService } from '../commande.service';
import { Commande } from '../commande';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommandeValidationModalComponent } from '../commande-validation-modal/commande-validation-modal.component';
import { Console } from '@angular/core/src/console';

@Component({
  selector: 'app-commande-validation',
  templateUrl: './commande-validation.component.html',
  styleUrls: ['./commande-validation.component.scss']
})
export class CommandeValidationComponent implements OnInit, OnDestroy {

  sieges: Siege[];
  siegesSubscription: Subscription;
  majoration: number;
  prixPlace = 10;

  constructor(private siegeService: SiegeService,
              private commandeService: CommandeService,
              private authService: AuthService,
              private modal: NgbModal) { }

  ngOnInit() {
    this.siegesSubscription = this.siegeService.siegesSubject.subscribe(
      (sieges: Siege[]) => {
        this.sieges = sieges;
      }
    );
    this.siegeService.emitSieges();
    if (this.sieges.length < 3) {
      this.majoration = this.sieges.length * 0.025;
    } else {
      this.majoration = this.sieges.length * 0.015;
    }
  }

  ngOnDestroy() {
    this.siegesSubscription.unsubscribe();
  }

  onPayer() {
    console.log(this.sieges);
    const idSeance = this.sieges[0].seance ? this.sieges[0].seance : null;
    const newCommande = new Commande(this.authService.userId,
                                     idSeance, false,
                                     (this.prixPlace * this.sieges.length + this.majoration),
                                     this.sieges.length, this.sieges);
    this.commandeService.commande = newCommande;
    this.commandeService.emitCommande();
    this.modal.open(CommandeValidationModalComponent);
  }
}
