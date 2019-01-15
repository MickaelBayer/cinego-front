import { Component, OnInit, Input } from '@angular/core';
import { Seance } from 'src/app/seance/seance';
import { SiegeService } from '../siege.service';
import { Siege } from '../siege';
import { Router } from '@angular/router';

@Component({
  selector: 'app-siege-select-form',
  templateUrl: './siege-select-form.component.html',
  styleUrls: ['./siege-select-form.component.scss']
})
export class SiegeSelectFormComponent implements OnInit {

  @Input() seance: Seance;

  sieges: Siege[];
  siegesSelect: Siege[] = [];

  constructor(private siegeService: SiegeService,
              private router: Router) { }

  ngOnInit() {
    this.siegeService.getSieges(this.seance).then(
      (sieges: Siege[]) => {
        this.sieges = sieges ? sieges : [];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkRangee(i: number) {
    if (i === 0) {
      return false;
    } else {
      return this.sieges[i].numRangee !== this.sieges[ i - 1 ].numRangee;
    }
  }

  determineImg(siege: Siege) {
    if (siege.estReserve && siege.type === 'handi') {
      return 'img/siege-handicape-reserve.png';
    } else
    if (!siege.estReserve && siege.type === 'handi') {
      if (this.siegesSelect.indexOf(siege) === -1) {
        return 'img/siege-handicape.png';
      } else {
        return 'img/siege-handicape-selectionne.png';
      }
    } else
    if (siege.estReserve && siege.type === 'siège') {
      return 'img/siege-reserve.png';
    } else
    if (!siege.estReserve && siege.type === 'siège') {
      if (this.siegesSelect.indexOf(siege) === -1) {
        return 'img/siege.png';
      } else {
        return 'img/siege-selectionne.png';
      }
    } else
    if (siege.type === 'couloir') {
      return 'img/couloir.png';
    }
  }

  onChangeImg(siege) {
    if (this.siegesSelect.indexOf(siege) === -1) {
      this.siegesSelect.push(siege);
    } else {
      const siegeToRmove = this.siegesSelect.findIndex(
        (siegeElement) => {
          if (siegeElement === siege) {
            return true;
          }
        }
      );
      // splice on an array to remove (fromIndex, nbElementsToRemove)
      this.siegesSelect.splice(siegeToRmove, 1);
    }
    this.determineImg(siege);
  }

  onValider() {
    this.siegeService.sieges = this.siegesSelect;
    this.siegeService.emitSieges();
    this.router.navigate(['/commande']);
  }
}
