import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { Pages404Component } from './pages.404';
import { PagesSignInComponent } from './pages.signin';

@NgModule({
    imports: [
        CommonModule,
        PagesRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [Pages404Component,
        PagesSignInComponent]
})
export class PagesModule { }
