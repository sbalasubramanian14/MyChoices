import { Component, Input, OnInit} from '@angular/core';
import { IOption } from 'ng-select';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { CaseBook } from '../../models/case.entities';
import { BaseCaseController } from './../basecase.controller';

@Component({
    selector: 'case-management',
    templateUrl: 'case-management.component.html',
    inputs: ['caseBook'],
    styleUrls: ['../cases.view.scss'],
})
export class CaseManagementComponent implements OnInit {

    public caseBook: CaseBook;
    public manageForm: any;
    public isManagementDataLoaded: boolean = false;

    public typesOfCounselingLookupOptionList: Array<IMultiSelectOption> = [];
    public typesOfCounselingLookupOptionList_S: Array<IOption> = [];
    public relationshipWithPMLookupOptionList: Array<IOption> = [];

    constructor() {
            this.typesOfCounselingLookupOptionList = BaseCaseController.staticParseMultiLookups("TypesOfCounselling");
            this.typesOfCounselingLookupOptionList_S = BaseCaseController.staticParseLookups("TypesOfCounselling");
            this.relationshipWithPMLookupOptionList = BaseCaseController.staticParseLookups("RelationshipWithPM");
    }

    ngOnInit() {
        this.manageForm = this.caseBook.Manage;
        this.isManagementDataLoaded = true;
    }
}