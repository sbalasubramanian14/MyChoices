import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp, JwtHelper, AuthConfig, tokenNotExpired, AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthenticationService } from './authentication.service';
import { BaseService } from './base.service';

@Injectable()
export class CommonService extends BaseService {
    constructor(public authHttp: Http, public authenticationService: AuthenticationService) {
        super(authHttp, authenticationService);
    }

    public getAllCenters(): Observable<Center[]> {        
        return this.authHttp.get('/api/Common/GetAllCenters/', this.getRequestOptions()).map((response: Response) => <Center[]>response.json());
    }

    public getAllPeaceMakers(): Observable<PeaceMaker[]> {
        return this.authHttp.get('/api/Common/GetAllPeaceMakers/', this.getRequestOptions()).map((response: Response) => <PeaceMaker[]>response.json());
    }

    public getAllCounselors(): Observable<Counselor[]> {
        return this.authHttp.get('/api/Common/GetAllCounselors/', this.getRequestOptions()).map((response: Response) => <Counselor[]>response.json());
    }

    public getAllLookups(): Observable<Lookup[]> {
        return this.authHttp.get('/api/Common/GetAllLookups/', this.getRequestOptions()).map((response: Response) => <Lookup[]>response.json());
    }

    public getAllStates(): Observable<State[]> {
        return this.authHttp.get('/api/Common/GetAllStates/', this.getRequestOptions()).map((response: Response) => <State[]>response.json());
    }

    public getAllCaseStatuses(): Observable<CaseStatus[]> {
        return this.authHttp.get('/api/Common/GetAllCaseStatuses/', this.getRequestOptions()).map((response: Response) => <CaseStatus[]>response.json());
    }
}