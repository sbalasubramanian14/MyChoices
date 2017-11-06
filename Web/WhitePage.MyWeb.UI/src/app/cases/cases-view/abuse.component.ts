import { Component, Input, OnInit } from '@angular/core';
import { IOption } from 'ng-select';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { CaseBook } from '../../models/case.entities';
import { BaseCaseController } from './../basecase.controller';

@Component({
    selector: 'abuse',
    templateUrl: 'abuse.component.html',
    inputs: ['caseBook'],
    styleUrls: ['../cases.view.scss'],
})
export class AbuseComponent implements OnInit {

    public caseBook: CaseBook;
    public caseAbuseForm: any
    public isAbuseDataLoaded: boolean = false;

    public sufferingFromAbuseLookupIdLookupOptionsList: Array<IOption> = [];
    public feelAboutAbuseLookupOptionsList: Array<IMultiSelectOption> = [];
    public farentsFeelAboutAbuseLookupOptionsList: Array<IMultiSelectOption> = [];
    public lawFeelAboutAbuseLookupOptionsList: Array<IMultiSelectOption> = [];
    public signsOfPhysicalAbuseLookupOptionsList: Array<IOption> = [];
    public weaponsUsedLookupOptionsList: Array<IMultiSelectOption> = [];
    public typesOfPhyscialAbuseLookupOptionsList: Array<IMultiSelectOption> = [];
    public frequencyOfPhyscialAbuseLookupOptionsList: Array<IOption> = [];

    public typesOfEmotionalAbuseLookupOptionsList: Array<IMultiSelectOption> = [];
    public frequencyOfEmotionalAbuseLookupOptionsList: Array<IOption> = [];
    public typesOfSexualAbuseLookupOptionsList: Array<IMultiSelectOption> = [];
    public frequencyOfSexualAbuseLookupOptionsList: Array<IOption> = [];
    public typesOfEconomicAbuseLookupOptionsList: Array<IMultiSelectOption> = [];
    public frequencyOfEconomicAbuseLookupOptionsList: Array<IOption> = [];
    public reasonsForAbuseLookupOptionsList: Array<IMultiSelectOption> = [];

    constructor() {        
        this.sufferingFromAbuseLookupIdLookupOptionsList = BaseCaseController.staticParseLookups("YesNo");
        this.feelAboutAbuseLookupOptionsList = BaseCaseController.staticParseMultiLookups("AbusingFeel");
        this.farentsFeelAboutAbuseLookupOptionsList = BaseCaseController.staticParseMultiLookups("AbusingParentsFeel");
        this.lawFeelAboutAbuseLookupOptionsList = BaseCaseController.staticParseMultiLookups("AbusingParentsFeel");
        this.signsOfPhysicalAbuseLookupOptionsList = BaseCaseController.staticParseLookups("YesNo");
        this.weaponsUsedLookupOptionsList = BaseCaseController.staticParseMultiLookups("AbusingWeapons");
        this.typesOfPhyscialAbuseLookupOptionsList = BaseCaseController.staticParseMultiLookups("TypesOfPhysicalAbuse");
        this.frequencyOfPhyscialAbuseLookupOptionsList = BaseCaseController.staticParseLookups("FrequencyOfAbuse");
        this.typesOfEmotionalAbuseLookupOptionsList = BaseCaseController.staticParseMultiLookups("TypesOfEmotionalAbuse");
        this.frequencyOfEmotionalAbuseLookupOptionsList = BaseCaseController.staticParseLookups("FrequencyOfAbuse");
        this.typesOfSexualAbuseLookupOptionsList = BaseCaseController.staticParseMultiLookups("TypesOfSexualAbuse");
        this.frequencyOfSexualAbuseLookupOptionsList = BaseCaseController.staticParseLookups("FrequencyOfAbuse");
        this.typesOfEconomicAbuseLookupOptionsList = BaseCaseController.staticParseMultiLookups("TypesOfEconomicalAbuse");
        this.frequencyOfEconomicAbuseLookupOptionsList = BaseCaseController.staticParseLookups("FrequencyOfAbuse");
        this.reasonsForAbuseLookupOptionsList = BaseCaseController.staticParseMultiLookups("ReasonForAbuse");
  
    }

    ngOnInit() {
        this.caseAbuseForm = this.caseBook.Abuse;
        this.isAbuseDataLoaded = true;
    }
}