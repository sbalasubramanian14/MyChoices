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
                'authorization': "bearer " + this.authenticationService.getToken(),                
                'Content-Type': 'application/json'
            }
        );
        return new RequestOptions({ headers: headers });
    }
}