import { User } from '../shared/user';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userAuthenticated: boolean = false;
  showMainNavigation = new EventEmitter();

  constructor(private router: Router) { }

  signin(user: User){
    if (user.Username == 'ilson@gmail.com' && user.Password == '123') {
      this.userAuthenticated = true;
      this.showMainNavigation.emit('true');

      console.log('login successful', this.showMainNavigation);

      this.router.navigate(['/']);
    }
    else{

      console.log('login failed', this.showMainNavigation);

      this.showMainNavigation.emit('false');
      this.userAuthenticated = false;
    }
  }

  signout() {
    console.log('logout inside auth service', this.showMainNavigation);
    this.userAuthenticated = false;
    this.router.navigate(['/signin']);
    this.showMainNavigation.emit('false');
  }

  IsUserAuthenticated() {
    return this.userAuthenticated;
  }
}
