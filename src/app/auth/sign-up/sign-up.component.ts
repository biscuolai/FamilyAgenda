import { AuthService } from './../auth.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './../../shared/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  subscription: Subscription;
  signUpForm: FormGroup;
  private user: User = new User();
  hide: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      Username: ['', Validators.required],
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.email],
      Password: ['', Validators.required]
    });
  }

  signUp(){
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.user.Username = this.signUpForm.get('Username').value;
      this.user.FirstName = this.signUpForm.get('FirstName').value;
      this.user.LastName = this.signUpForm.get('LastName').value;
      this.user.Email = this.signUpForm.get('Email').value;
      this.user.Password = this.signUpForm.get('Password').value;
      //this.authService.signup(this.user);
    }
  }

}
