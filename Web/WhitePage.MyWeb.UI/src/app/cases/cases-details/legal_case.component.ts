import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { CaseBook, Case, CaseAddress, vCaseAddress, CaseFeedback } from '../../models/case.entities';

import { ValidationService } from '../../services/validation.service';
import { CasesService } from '../../services/cases.services';

import { SelectModule, IOption } from 'ng-select';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

import { ModalDirective } from 'ng2-bootstrap/modal';

import { Center, PeaceMaker, Counselor, Lookup } from '../../models/entities';

import { BaseCaseController } from './../basecase.controller';

import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import * as moment from 'moment';

@Component({
    selector: 'legalCase',
    templateUrl: 'legal_case.component.html',
    inputs: ['caseBook'],
})

export class LegalCaseComponent implements OnInit {
    public caseBook: CaseBook;
    public caseLegalForm: FormGroup;
    public isLegalDataLoaded: boolean = false;

    constructor(public fb: FormBuilder,
        public validationService: ValidationService,
        public casesService: CasesService,
        public toastr: ToastsManager) {
    }

    ngOnInit() {
        this.loadLegalFromGroup();
        this.isLegalDataLoaded = true;
    }

    /* Start - Legal Case */
    public outcomeLookupOptionList: Array<IMultiSelectOption> = [];
    public documentsLookupOptionList: Array<IMultiSelectOption> = [];

    private loadLegalFromGroup() {
        this.caseLegalForm = this.fb.group({
            CaseNumber: new FormControl(this.caseBook.Legal.CaseNumber),
            Court: new FormControl(this.caseBook.Legal.Court),
            Prayer: new FormControl(this.caseBook.Legal.Prayer),
            LegalRepresentative: new FormControl(this.caseBook.Legal.LegalRepresentative),

            LegalConsentFormLookupId: new FormControl(this.caseBook.Legal.LegalConsentFormLookupId == undefined ? null : this.caseBook.Legal.LegalConsentFormLookupId.toString()),
            LegalActionLookupId: new FormControl(this.caseBook.Legal.LegalActionLookupId == undefined ? null : this.caseBook.Legal.LegalActionLookupId.toString()),
            OutcomeLookupId: new FormControl(this.caseBook.Legal.OutcomeLookupId == undefined ? null : this.caseBook.Legal.OutcomeLookupId.toString()),
            DocumentsLookupId: new FormControl(this.caseBook.Legal.DocumentsLookupId == undefined ? null : this.caseBook.Legal.DocumentsLookupId.toString())
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

        //this.caseBook.Legal.OutcomeLookupId = this.caseLegalForm.controls['OutcomeLookupId'].value;
        //this.caseBook.Legal.DocumentsLookupId = this.caseLegalForm.controls['DocumentsLookupId'].value;

        this.casesService
            .updateLegal(this.caseBook).subscribe(data => {
                //this.getCaseById();
                this.toastr.success('Legal updated successfully');

            }, (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }

    /* End of - Legal Case */
}