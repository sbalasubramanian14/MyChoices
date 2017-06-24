import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule, IOption } from 'ng-select';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { UserRoutingModule } from './user-routing.module';

import { UserCreateComponent } from './user.create';
import { PeacemakerCreateComponent } from './peacemaker.create';
import { CounselorCreateComponent } from './counselor.create';

import { CommonService } from '../services/common.services';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ModalModule, PaginationModule, TooltipModule, TabsModule } from 'ng2-bootstrap';
import { Ng2TableModule } from '../directives/customTable/ng-table-module';
import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,
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
        MyDatePickerModule
    ],
    declarations: [UserCreateComponent, PeacemakerCreateComponent, CounselorCreateComponent],
    providers: [
        CommonService
    ]
})
export class UserModule { }
