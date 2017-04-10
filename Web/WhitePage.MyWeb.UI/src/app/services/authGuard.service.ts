import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(public authenticationService: AuthenticationService, private router: Router) { }
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (tokenNotExpired()) {
            // Signed in.  
            return true;
        }

        let url: string = state.url;
        this.authenticationService.redirectUrl = url;

        this.router.navigate(['/pages/signin']);
        return false;
    }

}  