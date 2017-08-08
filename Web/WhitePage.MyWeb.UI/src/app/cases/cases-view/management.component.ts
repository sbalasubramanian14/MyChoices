import { Component, Input, OnInit} from '@angular/core';
import { IOption } from 'ng-select';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { CaseBook } from '../../models/case.entities';
import { BaseCaseController } from './../basecase.controller';

@Component({
    selector: 'management',
    templateUrl: 'management.component.html',
    inputs: ['caseBook'],
    styleUrls: ['../cases.view.scss'],

})
export class ManagementComponent implements OnInit {

    public caseBook: CaseBook;
    public manageForm: any;
    public isManagementDataLoaded: boolean = false;

    public sourceOfCaseLookupOptionList: Array<IOption> = [];
    public typesOfCounselingLookupOptionList: Array<IMultiSelectOption> = [];
    public typesOfCounselingLookupOptionList_S: Array<IOption> = [];
    public relationshipWithPMLookupOptionList: Array<IOption> = [];

    constructor() {

            this.sourceOfCaseLookupOptionList = BaseCaseController.staticParseLookups("SourceOfCase");
            this.typesOfCounselingLookupOptionList = BaseCaseController.staticParseMultiLookups("TypesOfCounselling");
            this.typesOfCounselingLookupOptionList_S = BaseCaseController.staticParseLookups("TypesOfCounselling");
            this.relationshipWithPMLookupOptionList = BaseCaseController.staticParseLookups("RelationshipWithPM");
    }


    ngOnInit() {
        this.manageForm = this.caseBook.Manage;
        this.isManagementDataLoaded = true;
    }
}