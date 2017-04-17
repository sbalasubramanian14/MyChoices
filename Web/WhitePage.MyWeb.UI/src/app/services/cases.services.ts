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

    public GetCaseById = (caseId: number): Observable<CaseBook> => {
        return this.authHttp.get('/api/cases/GetCaseById/' + caseId, this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updatePrimaryInfo = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdatePrimaryInfo', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updateAddress = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/updateAddress', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updateChildren = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdateChildren', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updateHouseHold = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdateHouseHold', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updateSpouse = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdateSpouse', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updatePhysicalHealth = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdatePhysicalHealth', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updateOffender = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdateOffender', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updateAbuse = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdateAbuse', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updateCase = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdateCase', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updateMental = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdateMental', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updateSessionLog = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdateSessionLog', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updateFeedback = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdateFeedback', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updateLegal = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdateLegal', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }
}