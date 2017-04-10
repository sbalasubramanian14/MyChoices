import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp , JwtHelper, AuthConfig, tokenNotExpired, AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthenticationService } from './authentication.service';
import { BaseService } from './base.service';
import { Case, CaseAddress, CaseBook, CaseHeader } from '../models/case.entities';

@Injectable()
export class CasesService extends BaseService {    
    constructor(public authHttp: Http, public authenticationService: AuthenticationService) {
        super(authHttp, authenticationService);
    }

    public addCasePrimary(caseBook: CaseBook): Observable<CaseHeader> {
        return this.authHttp.post('/api/cases/SaveCasePrimary', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseHeader>response.json());
    }

    public GetAll = (): Observable<CaseHeader[]> => {
        return this.authHttp.get('/api/cases/GetAll/', this.getRequestOptions()).map((response: Response) => <CaseHeader[]>response.json());
    }

    public GetCaseById = (caseId: number): Observable<Object> => {
        return this.authHttp.get('/api/cases/GetCaseById/' + caseId, this.getRequestOptions()).map((response: Response) => <Object>response.json());
    }

}