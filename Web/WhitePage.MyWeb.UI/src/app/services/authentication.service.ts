import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
import { UserRole, PeaceMaker, Counselor } from '../models/entities';

@Injectable()
export class AuthenticationService {

    public redirectUrl: string;

    private user: any = {};

    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http) {
        this.decodeToken();
        this.headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.options = new RequestOptions({ headers: this.headers });
    }

    public SignIn(username: string, password: string): Observable<any> {        
        // Token endpoint & params.  
        let tokenEndpoint: string = "/token";

        let params: any = {
            grant_type: "password",
            username: username,
            password: password
        };

        let body: string = this.encodeParams(params);

        return this.http.post(tokenEndpoint, body, this.options)
            .map((res: Response) => {                
                let body: any = res.json();
                
                if (typeof body.access_token !== 'undefined') {
                    this.store(body);
                }

            }).catch((error: any) => {
                return Observable.throw(error);
            });
    }

    public signout(): void {
        this.redirectUrl = null;
        this.clearLocalStorage();
        this.user = {};
    }

    public getUser(): any {
        return this.user;
    }

    public decodeToken(): void {
        if (tokenNotExpired()) {
            let token: string = localStorage.getItem('id_token');
            let jwtHelper: JwtHelper = new JwtHelper();
            this.user = jwtHelper.decodeToken(token);
        }
    }

    public getToken(): string {
        if (tokenNotExpired()) {
            let token: string = localStorage.getItem('id_token');
            return token;
        }
        else {
            return "";
        }
    }

    public getUserRoles(): Observable<UserRole[]> {
        return this.http.get('/api/user/GetAllRoles', this.getRequestOptions()).map((response: Response) => <UserRole[]>response.json());
    }

    public addPeaceMaker(peaceMaker: PeaceMaker): Observable<void> {
        return this.http.post('/api/user/AddPeaceMaker', JSON.stringify(peaceMaker), this.getRequestOptions()).map((response: Response) => <void>response.json());
    }

    public addCounselor(counselor: Counselor): Observable<void> {
        return this.http.post('/api/user/AddCounselor', JSON.stringify(counselor), this.getRequestOptions()).map((response: Response) => <void>response.json());
    }

    public addNewUserLogin(username: string, roleId: number, firstName: string, lastName: string): Observable<void> {
        return this.http.post('/api/user/AddNewUserLogin', JSON.stringify({ username: username, roleId: roleId, firstName: firstName, lastName: lastName }), this.getRequestOptions()).map((response: Response) => <void>response.json());
    }

    private encodeParams(params: any): string {

        let body: string = "";
        for (let key in params) {
            if (body.length) {
                body += "&";
            }
            body += key + "=";
            body += encodeURIComponent(params[key]);
        }
        return body;
    }

    private store(body: any): void {
        localStorage.setItem('id_token', body.access_token);
        this.decodeToken();
    }

    public clearLocalStorage(): void {
        localStorage.clear();
    }

    private remove(): void {
        localStorage.removeItem('id_token');

        //data
        localStorage.removeItem('getAllCenters');
        localStorage.removeItem('getAllPeaceMakers');
        localStorage.removeItem('getAllLookups');
        localStorage.removeItem('getAllStates');
    }

    public getRequestOptions(): RequestOptions {
        let headers = new Headers(
            {
                'authorization': "bearer " + this.getToken(),
                'Content-Type': 'application/json'
            }
        );
        return new RequestOptions({ headers: headers });
    }
}  