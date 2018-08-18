import { AuthService } from './../auth.service';
import { User } from './../../shared/user';
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
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required]
    });

    // this.subscription = this.route.queryParams.subscribe(
    //   (queryParams: any) => {
    //     // User is logging out

    //     console.log("queryParams['logout']", queryParams['logout'])

    //     this.isLoggingOut = (queryParams['logout'] !== undefined && queryParams['logout'] == 'true');

    //     if (this.isLoggingOut){
    //       console.log('log out inside login.component', this.isLoggingOut);
    //       this.authService.logout();
    //     }
    //   }
    // );
  }

  signIn() {

    console.log('form', this.signInForm);
    
    if (this.signInForm.valid) {
      console.log('form is valid');
      this.user.Username = this.signInForm.get('Username').value;
      this.user.Password = this.signInForm.get('Password').value;
      this.authService.signin(this.user);
    }
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();  
  // }
}

