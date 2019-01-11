import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token: string;
  userId: string;

  constructor(private http: HttpClient) {}

  createNewUser(nom: String, prenom: String, mail: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:8282/user/sign-up',
        { nom: nom, prenom: prenom, mail: mail, mdph5: password })
        .subscribe(
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
    });
  }

  login(mail: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:8282/login',
        { mail: mail, mdph5: password })
        .subscribe(
          (data: { token: string }) =>  {
            this.token = data.token;
            // this.userId = data.userId;
            this.isAuth$.next(true);
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  /**
   * Logout the sign in user
   */
  logout() {
    this.isAuth$.next(false);
    this.userId = null;
    this.token = null;
  }
}
