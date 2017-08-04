import { Component, Input, OnInit } from '@angular/core';
import { IOption } from 'ng-select';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { CaseBook } from '../../models/case.entities';
import { BaseCaseController } from './../basecase.controller';

@Component({
    selector: 'household',
    templateUrl: 'household.component.html',
    inputs: ['caseBook'],
    styleUrls: ['../cases.view.scss'],

})
export class HouseholdComponent implements OnInit {

    public caseBook: CaseBook;
    public familyHouseHold: any;
    public isHouseholdDataLoaded: boolean = false;

    public childrenDeceasedLookupOptionsList: Array<IMultiSelectOption> = [];
    public incomeLookupOptionsList: Array<IOption> = [];
    public yesNoOptionsList: Array<IOption> = [];
    public peacemakerAssistanceOptionsList: Array<IMultiSelectOption> = [];
    public religionOptionsList: Array<IOption> = [];
    public levelOfEducationOptionsList: Array<IOption> = [];
    public vocationalSkillsOptionsList: Array<IOption> = [];
    public occupationOptionsList: Array<IOption> = [];
    public householdMembersOptionsList: Array<IMultiSelectOption> = [];

    constructor() {

        this.childrenDeceasedLookupOptionsList = BaseCaseController.staticParseMultiLookups("ChildrenDeceased");
        this.incomeLookupOptionsList = BaseCaseController.staticParseLookups("Income");
        this.yesNoOptionsList = BaseCaseController.staticParseLookups("YesNo");
        this.peacemakerAssistanceOptionsList = BaseCaseController.staticParseMultiLookups("PeacemakerAssistance");
        this.religionOptionsList = BaseCaseController.staticParseLookups("Religion");
        this.levelOfEducationOptionsList = BaseCaseController.staticParseLookups("LevelOfEducation");
        this.vocationalSkillsOptionsList = BaseCaseController.staticParseLookups("VocationalSkills");
        this.occupationOptionsList = BaseCaseController.staticParseLookups("Occupation");
        this.householdMembersOptionsList = BaseCaseController.staticParseMultiLookups("HouseholdMembers");
    }


    ngOnInit() {

        this.familyHouseHold = this.caseBook.FamilyHouseHold;
        this.isHouseholdDataLoaded = true;
    }
}