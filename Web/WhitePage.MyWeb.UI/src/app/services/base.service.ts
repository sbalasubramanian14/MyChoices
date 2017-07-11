import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp, JwtHelper, AuthConfig, tokenNotExpired, AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthenticationService } from './authentication.service';
import { CaseHeader } from '../models/case.entities';

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

    public getOptions(id: number): RequestOptions {
        let headers = new Headers(
            {
                'authorization': "bearer " + this.authenticationService.getToken(),
                'Content-Type': 'application/json'
            }
        );
        return new RequestOptions({ params: {id: id}, headers: headers });
    }

    public getStringOptions(value: string): RequestOptions {
        let headers = new Headers(
            {
                'authorization': "bearer " + this.authenticationService.getToken(),
                'Content-Type': 'application/json'
            }
        );
        return new RequestOptions({ params: { column: value }, headers: headers });
    }

    public getValueWithParams(pageNumber: number, offset: number): RequestOptions {
        let headers = new Headers(
            {
                'authorization': "bearer " + this.authenticationService.getToken(),
                'Content-Type': 'application/json'
            }
        );
        return new RequestOptions({ params: { pageNumber: pageNumber, offset: offset }, headers: headers });
    }

    public getValueWithParamsDictionary(pageNumber: number, offset: number, dictionary: string): RequestOptions {
        let headers = new Headers(
            {
                'authorization': "bearer " + this.authenticationService.getToken(),
                'Content-Type': 'application/json'
            }
        );
        return new RequestOptions({ params: { pageNumber: pageNumber, offset: offset, dictionary: dictionary }, headers: headers });
    }

    public getSortedDataParamsDictionary(pageNumber: number, offset: number, dictionary: string, field: string): RequestOptions {
        let headers = new Headers(
            {
                'authorization': "bearer " + this.authenticationService.getToken(),
                'Content-Type': 'application/json'
            }
        );
        return new RequestOptions({ params: { pageNumber: pageNumber, offset: offset, dictionary: dictionary, field: field }, headers: headers });
    }
}