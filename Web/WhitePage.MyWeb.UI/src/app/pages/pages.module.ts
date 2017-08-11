import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { Pages404Component } from './pages.404';
import { PagesSignInComponent } from './pages.signin';
import { SpinnerModule } from '../spinner/spinner.module';

import { Angular2SocialLoginModule } from "angular2-social-login";

let providers = {
    "google": {
        "clientId": "612057850517-6b6b5thc6h2ua74kf3hqh08aee7uulib.apps.googleusercontent.com"
    }
};

@NgModule({
    imports: [
        CommonModule,
        PagesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        Angular2SocialLoginModule,
        SpinnerModule
    ],
    declarations: [Pages404Component,
        PagesSignInComponent]
})
export class PagesModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);
