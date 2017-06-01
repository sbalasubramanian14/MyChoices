import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TooltipModule } from 'ng2-bootstrap/tooltip';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';

//Custom Validation Module
import { CustomFormsModule } from 'ng2-validation'

// Routing Module
import { AppRoutes } from './app.routing';

//Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout.component';

import { AuthGuard } from './services/authguard.service';
import { AuthenticationService } from './services/authentication.service'

@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        AuthLayoutComponent,
        NAV_DROPDOWN_DIRECTIVES,
        BreadcrumbsComponent,
        SIDEBAR_TOGGLE_DIRECTIVES,
        AsideToggleDirective
    ],imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DropdownModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
        ChartsModule,
        RouterModule.forRoot(AppRoutes),
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ToastModule.forRoot()
    ],
    
    providers: [AuthGuard,
        AuthenticationService,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }],
    bootstrap: [AppComponent]
})
export class AppModule { }
