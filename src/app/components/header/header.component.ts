import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthSubcription: Subscription;
  isAuth: boolean;

  constructor(private authService: AuthService,
              private modal: NgbModal) { }

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
  }
}
