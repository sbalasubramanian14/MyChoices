import { Component, Input, OnInit } from '@angular/core';
import { IOption } from 'ng-select';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { CaseBook } from '../../models/case.entities';
import { BaseCaseController } from './../basecase.controller';

@Component({
    selector: 'legal',
    templateUrl: 'legal.component.html',
    inputs: ['caseBook'],
    styleUrls: ['../cases.view.scss'],

})
export class LegalComponent implements OnInit {

    public caseBook: CaseBook;
    public caseLegalForm: any
    public isLegalDataLoaded: boolean = false;

    public outcomeLookupOptionList: Array<IMultiSelectOption> = [];
    public documentsLookupOptionList: Array<IMultiSelectOption> = [];
    public yesNoOptionsList: Array<IOption> = [];

    constructor() {
            this.outcomeLookupOptionList = BaseCaseController.staticParseMultiLookups("Outcome");
            this.documentsLookupOptionList = BaseCaseController.staticParseMultiLookups("Documents");
            this.yesNoOptionsList = BaseCaseController.staticParseLookups("YesNo");
    }
      
    ngOnInit() {
        this.caseLegalForm = this.caseBook.Legal;
        this.isLegalDataLoaded = true;
    }
}