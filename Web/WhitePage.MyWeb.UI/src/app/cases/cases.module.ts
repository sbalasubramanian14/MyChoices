//core libraries
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//third-party libraries
import { SelectModule, IOption } from 'ng-select';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { AppModule } from '../app.module';
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

//view case components
import { PrimaryInfoComponent } from './cases-view/primaryInfo.component'
import { ChildrenComponent } from './cases-view/children.component'
import { HouseholdComponent } from './cases-view/household.component'
import { SpouseComponent } from './cases-view/spouse.component'
import { PhysicalHealthComponent } from './cases-view/physicalHealth.component'
import { OffenderComponent } from './cases-view/offender.component'
import { AbuseComponent } from './cases-view/abuse.component'
import { SessionsComponent } from './cases-view/sessions.component'
import { MentalComponent } from './cases-view/mental.component'
import { FeedbackComponent } from './cases-view/feedback.component'
import { LegalComponent } from './cases-view/legal.component'
import { ManagementComponent } from './cases-view/management.component'

//edit case components
import { PrimaryCaseComponent } from './cases-details/primary_case.component'
import { ChildrenCaseComponent } from './cases-details/children_case.component'
import { HouseholdCaseComponent } from './cases-details/household_case.component'
import { SpouseCaseComponent } from './cases-details/spouse_case.component'
import { PhysicalHealthCaseComponent } from './cases-details/physicalHealth_case.component'
import { OffenderCaseComponent } from './cases-details/offender_case.component'
import { AbuseCaseComponent } from './cases-details/abuse_case.component'
import { SessionsCaseComponent } from './cases-details/sessions_case.component'
import { MentalCaseComponent } from './cases-details/mental_case.component'
import { FeedbackCaseComponent } from './cases-details/feedback_case.component'
import { LegalCaseComponent } from './cases-details/legal_case.component'
import { ManageCaseComponent } from './cases-details/manage_case.component'

@NgModule({
    imports: [
        SharedModule,
        CasesRoutingModule,
        TabsModule.forRoot(),
        ModalModule.forRoot(),
        PaginationModule.forRoot(),
        TooltipModule.forRoot(),
        Ng2TableModule,
        ToastModule.forRoot(),
        MyDatePickerModule,
        SpinnerModule,
    ],
    declarations: [CasesCreateComponent,
        CasesDetailedComponent,
        CasesViewComponent,
        CasesMoveComponent,
        CasesListComponent,
        CaseRedirectComponent,
        MatchesPipe,
        PrimaryInfoComponent,
        ChildrenComponent,
        HouseholdComponent,
        SpouseComponent,
        PhysicalHealthComponent,
        OffenderComponent,
        AbuseComponent,
        SessionsComponent,
        MentalComponent,
        FeedbackComponent,
        LegalComponent,
        ManagementComponent,
        PrimaryCaseComponent,
        ChildrenCaseComponent,
        HouseholdCaseComponent,
        SpouseCaseComponent,
        PhysicalHealthCaseComponent,
        OffenderCaseComponent,
        AbuseCaseComponent,
        SessionsCaseComponent,
        MentalCaseComponent,
        FeedbackCaseComponent,
        LegalCaseComponent,
        ManageCaseComponent,
    ],
    providers: [
        CasesService,
        CommonService,
        ChartsService,
        ValidationService
    ]
})
export class CasesModule { }
