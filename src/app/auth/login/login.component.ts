import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  /**
   * Initiation du composant
   * Redirection vers Films si l'utilisateur est déjà connecté
   */
  ngOnInit() {
    if (this.authService.isAuth$) {
      this.router.navigate(['/films']);
    }
    this.initForm();
  }

  /**
   * Initialisation du formulaire et de ses controles
   */
  initForm() {
    // validators.pattern prend une regex en arg, ici au mois 6 chars de types alphanumériques
    this.signInForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  /**
   * Validation du formulaire de connexion,
   * connection de l'utilisateur et redirection
   */
  onSubmit() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.authService.login(email, password).then(
      () => {
        this.authService.getUserId().then(
          () => {
            // si tout se passe bien, on redirige
            this.router.navigate(['/films']);
          }
        );
      },
      (error) => {
        if (error.status === 403) {
          this.errorMessage = 'Mail ou mot de passe éronné';
        } else {
          this.errorMessage = 'Une erreur est survenue';
        }
      }
    );
  }

}
