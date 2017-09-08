import { Component, Input, OnInit } from '@angular/core';
import { IOption } from 'ng-select';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { CaseBook } from '../../models/case.entities';
import { BaseCaseController } from './../basecase.controller';

@Component({
    selector: 'physical-health',
    templateUrl: 'physical-health.component.html',
    inputs: ['caseBook'],
    styleUrls: ['../cases.view.scss'],
})
export class PhysicalHealthComponent implements OnInit {

    public caseBook: CaseBook;
    public physicalHealthForm: any
    public isHealthDataLoaded: boolean = false;

    public sleepPerNightLookupOptionsList: Array<IOption> = [];
    public appetiteLookupOptionsList: Array<IOption> = [];
    public exerciseLookupOptionsList: Array<IOption> = [];
    public reasonForSeekingHelpLookupOptionsList: Array<IMultiSelectOption> = [];
    public whoIsAbusingYouLookupOptionsList: Array<IMultiSelectOption> = [];
    public yesNoOptionsList: Array<IOption> = [];

    constructor() {    
        this.sleepPerNightLookupOptionsList = BaseCaseController.staticParseLookups("SleepPerNight");
        this.appetiteLookupOptionsList = BaseCaseController.staticParseLookups("Appetite");
        this.exerciseLookupOptionsList = BaseCaseController.staticParseLookups("Exercise");
        this.reasonForSeekingHelpLookupOptionsList = BaseCaseController.staticParseMultiLookups("ReasonForSeekingHelp");
        this.whoIsAbusingYouLookupOptionsList = BaseCaseController.staticParseMultiLookups("AbusingPerson");
        this.yesNoOptionsList = BaseCaseController.staticParseLookups("YesNo");
    }
      
    ngOnInit() {
        this.physicalHealthForm = this.caseBook.PhysicalHealth;
        this.isHealthDataLoaded = true;
    }
}