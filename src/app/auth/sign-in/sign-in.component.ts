import { AuthService } from '../auth.service';
import { User } from '../../shared/models/user';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  subscription: Subscription;
  //isLoggingOut: boolean;
  signInForm: FormGroup;
  private user: User = new User();
  hide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
  }

  signIn() {

    console.log('form', this.signInForm);

    if (this.signInForm.valid) {
      console.log('form is valid');
      this.user.email = this.signInForm.get('Email').value;
      this.user.password = this.signInForm.get('Password').value;
      this.authService.signin(this.user);
    }
  }

  signUp() {
    this.router.navigate(['/signup']);
  }
}

