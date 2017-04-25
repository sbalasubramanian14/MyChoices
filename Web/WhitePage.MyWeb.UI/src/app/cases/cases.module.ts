import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule, IOption } from 'ng-select';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { CasesCreateComponent } from './cases.create';
import { CasesDetailedComponent } from './cases.detailed';
import { CasesListComponent } from './cases.list';
import { CaseRedirectComponent } from './case.redirect';

import { CasesRoutingModule } from './cases-routing.module';
import { CasesService } from '../services/cases.services';
import { CommonService } from '../services/common.services';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ModalModule, PaginationModule, TooltipModule, TabsModule } from 'ng2-bootstrap';
import { Ng2TableModule } from '../directives/customTable/ng-table-module';


@NgModule({
    imports: [
        CommonModule,
        CasesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TabsModule.forRoot(),
        SelectModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        TooltipModule.forRoot(),
        Ng2TableModule,
        ToastModule.forRoot(),
        MultiselectDropdownModule
    ],
    declarations: [CasesCreateComponent,
        CasesDetailedComponent,
        CasesListComponent,
        CaseRedirectComponent],
    providers: [
        CasesService,
        CommonService
    ]
})
export class CasesModule { }
