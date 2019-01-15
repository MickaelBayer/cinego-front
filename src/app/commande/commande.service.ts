import { Injectable } from '@angular/core';
import { Commande } from './commande';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  commande: Commande;
  commandeSubject = new Subject<Commande>();

  constructor(private http: HttpClient,
              private authService: AuthService,
              ) { }

  emitCommande() {
    this.commandeSubject.next(this.commande);
  }

  saveCommande() {
    this.commande.estPaye = true;
    this.emitCommande();
    console.log(this.commande);
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:8282/commande', this.commande).subscribe(
        (response) => {
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  updateUserCommand() {
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:8282/user/' + this.commande.personne).subscribe(
        (response) => {
          this.commande.personne = response;
          this.emitCommande();
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
