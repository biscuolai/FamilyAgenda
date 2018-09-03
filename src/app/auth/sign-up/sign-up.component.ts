import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../shared/models/user';
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
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      ConfirmEmail: ['', [Validators.required, Validators.email]],
      Password: ['', Validators.required]
    });
  }

  signUp() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value);
      this.user.email = this.signUpForm.get('Email').value;
      this.user.confirmEmail = this.signUpForm.get('ConfirmEmail').value;
      this.user.password = this.signUpForm.get('Password').value;
      // this.authService.signup(this.user);
    }
  }

  signIn() {
    this.router.navigate(['/signin']);
  }

}
