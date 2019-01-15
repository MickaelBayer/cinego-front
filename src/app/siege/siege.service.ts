import { Injectable } from '@angular/core';
import { Siege } from './siege';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Seance } from '../seance/seance';

@Injectable({
  providedIn: 'root'
})
export class SiegeService {

  sieges: Siege[];
  siegesSubject = new Subject<Siege[]>();


  constructor( private http: HttpClient) { }

  getSieges(seance: Seance) {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8282/siege/seance/' + seance.id).subscribe(
        (response) => { console.log(response);
          resolve(response);
          // resolve(response[0].seance.sieges ? response[0].seance.sieges : response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  validResa() {
    this.sieges.forEach(element => {
      element.estReserve = true;
    });
  }

  saveSieges() {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8282/siege/sieges', this.sieges).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  emitSieges() {
    this.siegesSubject.next(this.sieges);
  }
}
