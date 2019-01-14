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
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  /*
  getSieges(seance: Seance) {
    this.http.get('http://localhost:8282/sieges/seance/' + seance.id).subscribe(
      (sieges: Siege[]) => {
        this.sieges = sieges ? sieges : [];
        this.emitSieges();
      },
      (error) => {
        console.log(error);
      }
    );
  }
*/
  emitSieges() {
    this.siegesSubject.next(this.sieges);
  }
}
