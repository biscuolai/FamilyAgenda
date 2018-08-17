import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { IFormCanDeactivate } from './iform-candeactivate';

@Injectable({
  providedIn: 'root'
})
export class FormDeactivateGuard implements CanDeactivate<IFormCanDeactivate> {
  canDeactivate(
    component: IFormCanDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean 
  {
    return component.canExitPage();
  }
}