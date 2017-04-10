import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp, JwtHelper, AuthConfig, tokenNotExpired, AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class BaseService {
    public redirectUrl: string;

    constructor(public authHttp: Http, public authenticationService: AuthenticationService) {
    }

    public getRequestOptions(): RequestOptions {
        let headers = new Headers(
            {
                //'Authorization': 'Bearer ' + this.authenticationService.decodeToken(),
                'Content-Type': 'application/json',
                'UserId': this.authenticationService.decodeToken()
            }
        );
        return new RequestOptions({ headers: headers });
    }
}