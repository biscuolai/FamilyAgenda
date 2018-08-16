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
      this.router.navigate(['/']);
    }
    else{
      this.showMainNavigation.emit('false');
      this.userAuthenticated = false;
    }
  }

  logout(){
    this.userAuthenticated = false;
    this.showMainNavigation.emit('false');
    this.router.navigate(['/login']);
  }
}
