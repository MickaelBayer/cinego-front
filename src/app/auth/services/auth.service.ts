import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Personne } from 'src/app/models/personne';
import * as moment from '../../../../node_modules/moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(this.isLoggedIn());
  isAdmin$ = new BehaviorSubject<boolean>(this.isLoggedIn());
  token: string;
  userId;

  constructor(private http: HttpClient) {}

  /**
   * Appel service de l'api pour la création d'un nouvel utilisateur
   * @param nom le nom du nouvel utilisateur
   * @param prenom le prénom du nouvel utilisateur
   * @param mail le mail du nouvel utilisateur
   * @param password le mot de passe du nouvel utilisateur
   */
  createNewUser(nom: String, prenom: String, mail: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://127.0.0.1:8282/user/sign-up',
        { nom: nom, prenom: prenom, mail: mail, mdph5: password })
        .subscribe(
          () => {
            this.getUserId().then(
              () => {
                this.login(mail, password).then(
                              () => {
                                resolve();
                              }
                            ).catch(
                              (error) => {
                                reject(error);
                              }
                            );
              },
              (error) => {
                reject(error);
              }
            );
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  /**
   * Appel service de l'api pour la connexion d'un utilisateur
   * @param mail Le mail de l'utilisateur
   * @param password Le password de l'utitilsateur
   */
  login(mail: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://127.0.0.1:8282/login',
        { mail: mail, mdph5: password })
        .subscribe(
          (data: { token: string , expiresIn: string, userId: string, admin: string}) =>  {
            this.token = data.token; console.log(data);
            const expiresAt = moment().add(data.expiresIn, 'millisecond');
            localStorage.setItem('id_token', data.token);
            localStorage.setItem('expires_at', JSON.stringify(expiresAt) );
            this.userId = data.userId;
            this.isAuth$.next(true);
            this.http.get('http://127.0.0.1:8282/user/updateUserId/' + this.userId).subscribe(
              (res: Personne) => {
                if (res) {
                  console.log(res);
                  this.isAdmin$.next(res.admin);
                  console.log( this.isAdmin$.value);
                }
                resolve();
              },
              (error) => {
                reject(error);
              }
            );
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  /**
   * Remplace le mail stocké dans userId par l'ID de l'utilisateur dans la base
   */
  getUserId() {
    return new Promise((resolve, reject) => {
      this.http.get('http://127.0.0.1:8282/user/updateUserId/' + this.userId)
        .subscribe(
          (data: Personne) =>  {
            this.userId = data.id;
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  /**
   * Déconnecte l'utilisateur
   */
  logout() {
    this.isAuth$.next(false);
    this.isAdmin$.next(false);
    this.userId = null;
    this.token = null;
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  /**
   * Retourne la date d'expiration du token de connexion
   */
  public getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  /**
   * Retourne vrai si l'utilisateur est connecté
   */
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  /**
   * Retourne vrai si l'utilisateur est déconnecté
   */
  public isLoggedOut() {
      return !this.isLoggedIn();
  }
}
