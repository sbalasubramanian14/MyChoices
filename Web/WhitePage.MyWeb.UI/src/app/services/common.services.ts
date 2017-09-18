import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp, JwtHelper, AuthConfig, tokenNotExpired, AUTH_PROVIDERS } from 'angular2-jwt';
import { AuthenticationService } from './authentication.service';
import { BaseService } from './base.service';
import { Center, PeaceMaker, Counselor, Lookup, State, ChartObject, CaseStatus, User } from '../models/entities';

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

    public getChartsData(): Observable<ChartObject[]> {
        return this.authHttp.get('/api/Common/GetChartObjectValues/', this.getRequestOptions()).map((response: Response) => <ChartObject[]>response.json());
    }
    public getActiveNonAdminUsers(pageNumber: number, offset: number): Observable<User[]> {
        return this.authHttp.get('/api/Common/GetActiveNonAdminUsers/', this.getValueWithParams(pageNumber, offset)).map((response: Response) => <User[]>response.json());
    }
    public getUsersCount = (): Observable<number> => {
        return this.authHttp.get('/api/Common/GetUsersCount/', this.getRequestOptions()).map((response: Response) => <number>response.json());
    }
    public GetSortedUsersDataAsc(pageNumber: number, offset: number, dictionary: Object, field: string): Observable<User[]> {
        return this.authHttp.get('/api/Common/GetSortedUsersDataAsc/', this.getSortedDataParamsDictionary(pageNumber, offset, JSON.stringify(dictionary), field)).map((response: Response) => <User[]>response.json());
    }

    public GetSortedUsersDataDesc(pageNumber: number, offset: number, dictionary: Object, field: string): Observable<User[]> {
        return this.authHttp.get('/api/Common/GetSortedUsersDataDesc/', this.getSortedDataParamsDictionary(pageNumber, offset, JSON.stringify(dictionary), field)).map((response: Response) => <User[]>response.json());
    }
    public GetFilteredUsers(pageNumber: number, offset: number, dictionary: Object): Observable<User[]> {
        return this.authHttp.get('/api/Common/GetFilteredUsers', this.getValueWithParamsDictionary(pageNumber, offset, JSON.stringify(dictionary))).map((response: Response) => <User[]>response.json());
    }
    public GetFilteredUsersCount(pageNumber: number, offset: number, dictionary: Object): Observable<number> {
        return this.authHttp.get('/api/Common/GetFilteredUsersCount/', this.getValueWithParamsDictionary(pageNumber, offset, JSON.stringify(dictionary))).map((response: Response) => <number>response.json());
    }
}