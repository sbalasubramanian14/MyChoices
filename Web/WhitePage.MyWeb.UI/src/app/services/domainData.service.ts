import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class DomainDataService {
    constructor(public authenticationService: AuthenticationService, private router: Router) { }
    
    public centersList: Array<any> = [
        { Value: "1", Text: "Lakdikapul" },
        { Value: "2", Text: "Falaknuma" },
        { Value: "3", Text: "Golconda" },
        { Value: "4", Text: "Secunderabad" },
        { Value: "5", Text: "Warangal" }
    ];

}  