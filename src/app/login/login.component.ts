import { User } from './../shared/user';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  subscription: Subscription;
  isLoggingOut: boolean;
  loginForm: FormGroup;
  private user: User = new User();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });

    this.subscription = this.route.queryParams.subscribe(
      (queryParams: any) => {
        // User is logging out

        console.log("queryParams['logout']", queryParams['logout'])

        this.isLoggingOut = (queryParams['logout'] !== undefined && queryParams['logout'] == 'true');

        if (this.isLoggingOut){
          console.log('log out inside login.component', this.isLoggingOut);
          this.authService.logout();
        }
      }
    );
  }

  login() {

    console.log('form', this.loginForm);
    
    if (this.loginForm.valid) {
      console.log('form is valid');
      this.user.Username = this.loginForm.get('Username').value;
      this.user.Password = this.loginForm.get('Password').value;
      this.authService.login(this.user);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();  
  }
}
