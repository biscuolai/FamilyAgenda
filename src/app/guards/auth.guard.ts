import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
    {
      // user is authenticated
      if (this.authService.IsUserAuthenticated()){
        return true;
      }
      else {
        // user is not authenticated then redirect to login page
        this.router.navigate(['/login']);
        return false;
      }
    }
}
