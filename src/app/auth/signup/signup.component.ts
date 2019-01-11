import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    // validators.pattern prend une regex en arg, ici au mois 6 chars de types alphanumériques
    this.signUpForm = this.formBuilder.group({
      nom : [ null, [Validators.required]],
      prenom : [null, [Validators.required]],
      mail: [ null, [Validators.required, Validators.email]],
      password: [ null, [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const nom = this.signUpForm.get('nom').value;
    const prenom = this.signUpForm.get('prenom').value;
    const mail = this.signUpForm.get('mail').value;
    const password = this.signUpForm.get('password').value;
    this.authService.createNewUser(nom, prenom , mail, password).then(
      () => {
        // si tout se passe bien, on redirige
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
        /*if (error['error']['error']['errors']['mail']['kind'] === 'unique') {
          this.errorMessage = 'Email already used !';
        } else {
          this.errorMessage = error;
        }*/
      }
    );
  }



}
