import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

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
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.form = this.fb.group({
            uname: [null, Validators.compose([Validators.required])], password: [null, Validators.compose([Validators.required])]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit() {
        this.authenticationService.SignIn(this.form.controls['uname'].value, this.form.controls['password'].value)
            .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                console.log(error);
                this.errorMsg = "Invalid credentials";
            });

        //this.router.navigate(['/home']);
    }

}
