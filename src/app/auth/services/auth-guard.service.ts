import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return Observable.create(
      (observer) => {
        this.authService.isAuth$.subscribe(
          (auth) => {
            if (!auth) {
              this.router.navigate(['/auth', 'signin']);
            }
            observer.next(true);
          }
        );
      }
    );
  }

}
