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
export class ChartsService extends BaseService {
    constructor(public authHttp: Http, public authenticationService: AuthenticationService) {
        super(authHttp, authenticationService);
    }
    public getCenterWiseChartsData(id: number): Observable<ChartObject[]> {
        return this.authHttp.get('/api/Charts/GetCenterWiseChartObjectValues/', this.getOptions(id)).map((response: Response) => <ChartObject[]>response.json());
    }

    public getCounselorWiseChartsData(id: number): Observable<ChartObject[]> {
        return this.authHttp.get('/api/Charts/GetCounselorWiseChartObjectValues/', this.getOptions(id)).map((response: Response) => <ChartObject[]>response.json());
    }

    public getPeacemakerWiseChartsData(id: number): Observable<ChartObject[]> {
        return this.authHttp.get('/api/Charts/GetPeacemakerWiseChartObjectValues/', this.getOptions(id)).map((response: Response) => <ChartObject[]>response.json());
    }

    public getCenterChartsData(column: string): Observable<ChartObject[]> {
        return this.authHttp.get('/api/Charts/GetCenterChartObjectValues/', this.getStringOptions(column)).map((response: Response) => <ChartObject[]>response.json());
    }

    public getCounselorChartsData(column: string): Observable<ChartObject[]> {
        return this.authHttp.get('/api/Charts/GetCounselorChartObjectValues/', this.getStringOptions(column)).map((response: Response) => <ChartObject[]>response.json());
    }

    public getPeacemakerChartsData(column: string): Observable<ChartObject[]> {
        return this.authHttp.get('/api/Charts/GetPeacemakerChartObjectValues/', this.getStringOptions(column)).map((response: Response) => <ChartObject[]>response.json());
    }
}