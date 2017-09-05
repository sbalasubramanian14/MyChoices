import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { CaseBook, Case, CaseAddress, vCaseAddress, CaseFeedback, CaseOffender, vCaseOffender } from '../../models/case.entities';

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
    selector: 'offenderCase',
    templateUrl: 'offender_case.component.html',
    inputs: ['caseBook'],
})

export class OffenderCaseComponent implements OnInit {
    public caseBook: CaseBook;
    public caseOffenderForm: FormGroup;
    public isCaseBookDataLoaded: boolean = false;

    constructor(public fb: FormBuilder,
        public validationService: ValidationService,
        public casesService: CasesService,
        public toastr: ToastsManager) {
    }

    ngOnInit() {
        this.isCaseBookDataLoaded = true;
    }

    /* Start - Offender */

    @ViewChild('offenderModal') public offenderModal: ModalDirective;

    public addNewOffender() {
        this.caseBook.SelectedOffender = new CaseOffender();
        this.caseBook.SelectedOffender.CaseId = this.caseBook.Case.CaseId;

        this.caseOffenderForm = this.fb.group({
            Name: new FormControl(this.caseBook.SelectedOffender.Name, Validators.required),
            Age: new FormControl(this.caseBook.SelectedOffender.Age, [Validators.maxLength(2), this.validationService.validateNumber, Validators.required]),
            GenderLookupId: new FormControl(this.caseBook.SelectedOffender.GenderLookupId == undefined ? null : this.caseBook.SelectedOffender.GenderLookupId.toString(), Validators.required),
            RelationshipWithVictimLookupId: new FormControl(this.caseBook.SelectedOffender.RelationshipWithVictimLookupId == undefined ? null : this.caseBook.SelectedOffender.RelationshipWithVictimLookupId.toString(), Validators.required),
            OtherRelationship: new FormControl(this.caseBook.SelectedOffender.OtherRelationship)
        });
        this.offenderModal.show();
    }

    public editOffender(offender: vCaseOffender) {
        this.caseBook.SelectedOffender = new CaseOffender();
        this.caseBook.SelectedOffender.CaseOffenderId = offender.CaseOffenderId;
        this.caseBook.SelectedOffender.CaseId = offender.CaseId;
        this.caseBook.SelectedOffender.Name = offender.Name;
        this.caseBook.SelectedOffender.Age = offender.Age;
        this.caseBook.SelectedOffender.GenderLookupId = offender.GenderLookupId;
        this.caseBook.SelectedOffender.RelationshipWithVictimLookupId = offender.RelationshipWithVictimLookupId;
        this.caseBook.SelectedOffender.OtherRelationship = offender.OtherRelationship;

        this.caseOffenderForm = this.fb.group({
            Name: new FormControl(this.caseBook.SelectedOffender.Name, Validators.required),
            Age: new FormControl(this.caseBook.SelectedOffender.Age, [Validators.maxLength(2), this.validationService.validateNumber, Validators.required]),
            GenderLookupId: new FormControl(this.caseBook.SelectedOffender.GenderLookupId == undefined ? null : this.caseBook.SelectedOffender.GenderLookupId.toString(), Validators.required),
            RelationshipWithVictimLookupId: new FormControl(this.caseBook.SelectedOffender.RelationshipWithVictimLookupId == undefined ? null : this.caseBook.SelectedOffender.RelationshipWithVictimLookupId.toString(), Validators.required),
            OtherRelationship: new FormControl(this.caseBook.SelectedOffender.OtherRelationship, Validators.required)
        });
        this.offenderModal.show();
    }

    public hideOffenderModal(): void {
        this.offenderModal.hide();
    }

    public saveOffender(offender: vCaseOffender) {
        this.caseBook.SelectedOffender.Name = this.caseOffenderForm.controls['Name'].value;
        this.caseBook.SelectedOffender.Age = this.caseOffenderForm.controls['Age'].value;
        this.caseBook.SelectedOffender.GenderLookupId = this.caseOffenderForm.controls['GenderLookupId'].value;
        this.caseBook.SelectedOffender.RelationshipWithVictimLookupId = this.caseOffenderForm.controls['RelationshipWithVictimLookupId'].value;
        this.caseBook.SelectedOffender.OtherRelationship = this.caseOffenderForm.controls['OtherRelationship'].value;

        this.casesService
            .updateOffender(this.caseBook).subscribe(data => {
                this.offenderModal.hide();
                this.caseBook.vOffender.push(data);
                this.toastr.success('Offender updated successfully');

            }, (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }
    /* End of - Offender */
}