import { User } from './../shared/user';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userAuthenticated: boolean = false;
  showMainNavigation = new EventEmitter();

  constructor(private router: Router) { }

  login(user: User){
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

  logout() {
    console.log('logout inside auth service', this.showMainNavigation);
    this.userAuthenticated = false;
    this.showMainNavigation.emit('false');
    this.router.navigate(['/login']);
  }

  IsUserAuthenticated() {
    return this.userAuthenticated;
  }
}
