import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp , JwtHelper, AuthConfig, tokenNotExpired, AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthenticationService } from './authentication.service';
import { BaseService } from './base.service';
import { Case, CaseAddress, CaseBook, CaseHeader, vCaseChildren, vCaseOffender, vCaseMental, vCaseFeedback, vCaseSessionLog, vCaseAddress } from '../models/case.entities';

@Injectable()
export class CasesService extends BaseService {    
    constructor(public authHttp: Http, public authenticationService: AuthenticationService) {
        super(authHttp, authenticationService);
    }

    public addCasePrimary(caseBook: CaseBook): Observable<CaseHeader> {
        return this.authHttp.post('/api/cases/SaveCasePrimary', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseHeader>response.json());
    }

    public GetAllActive(pageNumber: number, offset: number): Observable<CaseHeader[]> {
        return this.authHttp.get('/api/cases/GetAllActive', this.getValueWithParams(pageNumber, offset)).map((response: Response) => <CaseHeader[]>response.json());
    }    

    public GetCasesCount = (): Observable<number> => {
        return this.authHttp.get('/api/cases/GetCasesCount/', this.getRequestOptions()).map((response: Response) => <number>response.json());
    }

    public GetFilteredCases(pageNumber: number, offset: number, dictionary: Object): Observable<CaseHeader[]> {
        return this.authHttp.get('/api/cases/GetFilteredCases', this.getValueWithParamsDictionary(pageNumber, offset, JSON.stringify(dictionary))).map((response: Response) => <CaseHeader[]>response.json());
    }

    public GetFilteredCasesCount(pageNumber: number, offset: number, dictionary: Object): Observable<number> {
        return this.authHttp.get('/api/cases/GetFilteredCasesCount/', this.getValueWithParamsDictionary(pageNumber, offset, JSON.stringify(dictionary))).map((response: Response) => <number>response.json());
    }

    public GetSortedCasesDataAsc(pageNumber: number, offset: number, dictionary: Object, field: string): Observable<CaseHeader[]> {
        return this.authHttp.get('/api/cases/GetSortedCasesDataAsc/', this.getSortedDataParamsDictionary(pageNumber, offset, JSON.stringify(dictionary), field)).map((response: Response) => <CaseHeader[]>response.json());
    }

    public GetSortedCasesDataDesc(pageNumber: number, offset: number, dictionary: Object, field: string): Observable<CaseHeader[]> {
        return this.authHttp.get('/api/cases/GetSortedCasesDataDesc/', this.getSortedDataParamsDictionary(pageNumber, offset, JSON.stringify(dictionary), field)).map((response: Response) => <CaseHeader[]>response.json());
    }

    public GetCaseById = (caseId: number): Observable<CaseBook> => {
        return this.authHttp.get('/api/cases/GetCaseById/' + caseId, this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updatePrimaryInfo = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdatePrimaryInfo', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updateAddress = (caseBook: CaseBook): Observable<vCaseAddress> => {
        return this.authHttp.post('/api/cases/updateAddress', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <vCaseAddress>response.json());
    }

    public updateChildren = (caseBook: CaseBook): Observable<vCaseChildren> => {
        return this.authHttp.post('/api/cases/UpdateChildren', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <vCaseChildren>response.json());
    }

    public updateHouseHold = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdateHouseHold', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updateSpouse = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdateSpouse', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updateCaseStatus = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdateCaseStatus', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updatePhysicalHealth = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdatePhysicalHealth', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updateOffender = (caseBook: CaseBook): Observable<vCaseOffender> => {
        return this.authHttp.post('/api/cases/UpdateOffender', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <vCaseOffender>response.json());
    }

    public updateAbuse = (caseBook: CaseBook): Observable<CaseBook> => {
        return this.authHttp.post('/api/cases/UpdateAbuse', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <CaseBook>response.json());
    }

    public updateCase = (caseBook: CaseBook): Observable<number> => {
        return this.authHttp.post('/api/cases/UpdateCaseManagement', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <number>response.json());
    }

    public updateMental = (caseBook: CaseBook): Observable<vCaseMental> => {
        return this.authHttp.post('/api/cases/UpdateMental', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <vCaseMental>response.json());
    }

    public updateSessionLog = (caseBook: CaseBook): Observable<vCaseSessionLog> => {
        return this.authHttp.post('/api/cases/UpdateSessionLog', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <vCaseSessionLog>response.json());
    }

    public updateFeedback = (caseBook: CaseBook): Observable<vCaseFeedback> => {
        return this.authHttp.post('/api/cases/UpdateFeedback', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <vCaseFeedback>response.json());
    }

    public updateLegal = (caseBook: CaseBook): Observable<number> => {
        return this.authHttp.post('/api/cases/UpdateLegal', JSON.stringify(caseBook), this.getRequestOptions()).map((response: Response) => <number>response.json());
    }
    public deleteCase = (caseId: number): Observable<boolean> => {
        return this.authHttp.post('/api/cases/DeleteCase', JSON.stringify(caseId), this.getRequestOptions()).map((response: Response) => <boolean>response.json());
    }
}