import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CinemaSelectFormComponent } from 'src/app/cinema/cinema-select-form/cinema-select-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthSubcription: Subscription;
  isAuth: boolean;

  constructor(private authService: AuthService,
              private modal: NgbModal,
              private router: Router) { }

  ngOnInit() {
    this.isAuthSubcription = this.authService.isAuth$.subscribe(
      (auth) => {
        this.isAuth = auth;
      }
    );
  }

  ngOnDestroy() {
    this.isAuthSubcription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth', 'login']);
  }

  onCinema() {
    this.modal.open(CinemaSelectFormComponent);
  }
}
