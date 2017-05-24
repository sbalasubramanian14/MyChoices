import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from "angular2-social-login";

import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-signin',
    templateUrl: './pages.signin.html'
})
export class PagesSignInComponent implements OnInit {

    public form: FormGroup;
    returnUrl: string;
    errorMsg: string;

    constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
        private authenticationService: AuthenticationService,
        public _auth: AuthService) { }

    ngOnInit() {
        this.form = this.fb.group({
            uname: [null, Validators.compose([Validators.required])], password: [null, Validators.compose([Validators.required])]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    public user: any;
    signIn(provider: string) {
        this._auth.login(provider).subscribe(data => {
            this.user = data;
            var emailId: string = this.user.email;
            this.authenticationService.SignIn(emailId, "google")
                .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    console.log(error);
                    this.errorMsg = "Your identity not authorized; please contact your administrator.";
                });
        });



        //this.router.navigate(['/home']);
    }

    tempSignIn() {
        this.authenticationService.SignIn("admin", "test")
            .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                console.log(error);
                this.errorMsg = "Your identity not authorized; please contact your administrator.";
            });
    }

}
