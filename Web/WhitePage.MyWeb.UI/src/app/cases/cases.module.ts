import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule, IOption } from 'ng-select';

import { CasesCreateComponent } from './cases.create';
import { CasesDetailedComponent } from './cases.detailed';
import { CasesListComponent } from './cases.list';
import { CasesRoutingModule } from './cases-routing.module';
import { CasesService } from '../services/cases.services';
import { CommonService } from '../services/common.services';

import { TabsModule } from "ng2-tabs";
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ModalModule, PaginationModule, TooltipModule } from 'ng2-bootstrap';
import { Ng2TableModule } from '../directives/customTable/ng-table-module';


@NgModule({
    imports: [
        CommonModule,
        CasesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        TabsModule,
        SelectModule,
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        TooltipModule.forRoot(),
        Ng2TableModule
    ],
    declarations: [CasesCreateComponent,
        CasesDetailedComponent,
        CasesListComponent],
    providers: [
        CasesService,
        CommonService
    ]
})
export class CasesModule { }
