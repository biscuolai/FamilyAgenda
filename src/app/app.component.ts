import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showMainNavigation: boolean = false;
  subscription: Subscription;
  
  constructor(private authService: AuthService) 
  {

  }

  ngOnInit(){
    this.subscription = this.authService.showMainNavigation.subscribe(
      show => this.showMainNavigation = (show == 'true')
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();    
  }
}
