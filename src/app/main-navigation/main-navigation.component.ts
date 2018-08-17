import { AuthService } from '../auth/auth.service';
import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent {

  @Input() showNav: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}
  
  logout(){
    this.authService.logout();
  }
}
