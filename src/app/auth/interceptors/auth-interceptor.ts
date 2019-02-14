import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  /**
   * Intercepte les requètes http sortantes pour y rajouter le token de connexion
   * @param req requète à intercepter pour la modification
   * @param next requète modifiée à envoyer
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = localStorage.getItem('id_token');
    const newRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + (authToken ? authToken : ''))
    });
    return next.handle(newRequest);
  }
}
