import { Router, NavigationEnd } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

    public userData: any;
    public isUserAdmin: boolean;
    constructor(private router: Router
        , private authenticationService: AuthenticationService) {
        this.userData = this.authenticationService.getUser();
        this.isUserAdmin = this.userData.typ == "1" ? true : false;
     }

  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};

  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  onSignout(): void {
      this.authenticationService.signout();
      this.router.navigate(['/pages/signin']);
  }

  clearLocalStorage(): void {
      let tokenString = 'id_token';
      let token = localStorage.getItem(tokenString);
      this.authenticationService.clearLocalStorage();
      localStorage.setItem(tokenString, token);
  }

  ngOnInit(): void {}
}
