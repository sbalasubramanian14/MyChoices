import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppModule } from '../app.module';

import { SelectModule, IOption } from 'ng-select';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { MatchesPipe } from '../pipes/Matches.Pipe'
import { CasesCreateComponent } from './cases.create';
import { CasesDetailedComponent } from './cases.detailed';
import { CasesViewComponent } from './cases.view';
import { CasesMoveComponent } from './cases.move';
import { CasesListComponent } from './cases.list';
import { CaseRedirectComponent } from './case.redirect';

import { CasesRoutingModule } from './cases-routing.module';
import { CasesService } from '../services/cases.services';
import { CommonService } from '../services/common.services';
import { ChartsService } from '../services/charts.services';
import { ValidationService } from '../services/validation.service';

import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ModalModule, PaginationModule, TooltipModule, TabsModule } from 'ng2-bootstrap';
import { Ng2TableModule } from '../directives/customTable/ng-table-module';
import { MyDatePickerModule } from 'mydatepicker';

import { SpinnerModule } from '../spinner/spinner.module';

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
        MultiselectDropdownModule,
        MyDatePickerModule,
        SpinnerModule,
    ],
    declarations: [CasesCreateComponent,
        CasesDetailedComponent,
        CasesViewComponent,
        CasesMoveComponent,
        CasesListComponent,
        CaseRedirectComponent,
        MatchesPipe],
    providers: [
        CasesService,
        CommonService,
        ChartsService,
        ValidationService
    ]
})
export class CasesModule { }
