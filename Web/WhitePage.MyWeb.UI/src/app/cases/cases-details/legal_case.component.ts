import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IOption } from 'ng-select';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { CasesService } from '../../services/cases.services';

import { BaseCaseController } from './../basecase.controller';

import { CaseBook, CaseFeedback } from '../../models/case.entities';

@Component({
    selector: 'legalCase',
    templateUrl: 'legal_case.component.html',
    inputs: ['caseBook'],
})

export class LegalCaseComponent implements OnInit {
    public caseBook: CaseBook;
    public caseLegalForm: FormGroup;
    public isLegalDataLoaded: boolean = false;
    public outcomeLookupOptionList: Array<IMultiSelectOption> = [];
    public documentsLookupOptionList: Array<IMultiSelectOption> = [];
    public yesNoOptionsList: Array<IOption> = [];

    constructor(
        private fb: FormBuilder,
        private casesService: CasesService,
        private toastr: ToastsManager) {

        this.outcomeLookupOptionList = BaseCaseController.staticParseMultiLookups("Outcome");
        this.documentsLookupOptionList = BaseCaseController.staticParseMultiLookups("Documents");
        this.yesNoOptionsList = BaseCaseController.staticParseLookups("YesNo");
    }

    ngOnInit() {
        this.loadLegalFromGroup();
        this.isLegalDataLoaded = true;
    }    

    private loadLegalFromGroup() {
        this.caseLegalForm = this.fb.group({
            CaseNumber: [this.caseBook.Legal.CaseNumber],
            Court: [this.caseBook.Legal.Court],
            Prayer: [this.caseBook.Legal.Prayer],
            LegalRepresentative: [this.caseBook.Legal.LegalRepresentative],

            LegalConsentFormLookupId: [this.caseBook.Legal.LegalConsentFormLookupId == undefined ? null : this.caseBook.Legal.LegalConsentFormLookupId.toString()],
            LegalActionLookupId: [this.caseBook.Legal.LegalActionLookupId == undefined ? null : this.caseBook.Legal.LegalActionLookupId.toString()],
            OutcomeLookupId: [this.caseBook.Legal.OutcomeLookupId == undefined ? null : this.caseBook.Legal.OutcomeLookupId.toString()],
            DocumentsLookupId: [this.caseBook.Legal.DocumentsLookupId == undefined ? null : this.caseBook.Legal.DocumentsLookupId.toString()]
        });
    }

    public onUpdateLegal() {
        this.caseBook.Legal.CaseId = this.caseBook.Case.CaseId;

        this.caseBook.Legal.CaseNumber = this.caseLegalForm.controls['CaseNumber'].value;
        this.caseBook.Legal.Court = this.caseLegalForm.controls['Court'].value;
        this.caseBook.Legal.Prayer = this.caseLegalForm.controls['Prayer'].value;
        this.caseBook.Legal.LegalRepresentative = this.caseLegalForm.controls['LegalRepresentative'].value;

        this.caseBook.Legal.LegalConsentFormLookupId = this.caseLegalForm.controls['LegalConsentFormLookupId'].value;
        this.caseBook.Legal.LegalActionLookupId = this.caseLegalForm.controls['LegalActionLookupId'].value;

        this.casesService.updateLegal(this.caseBook).subscribe(
            data => {
                this.toastr.success('Legal updated successfully');
            },
            (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            }
        );
    }
}