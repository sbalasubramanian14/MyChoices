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
    selector: 'manageCase',
    templateUrl: 'manage_case.component.html',
    inputs: ['caseBook'],
})

export class ManageCaseComponent implements OnInit {
    public caseBook: CaseBook;
    public caseManageForm: FormGroup;
    public isManageDataLoaded: boolean = false;

    constructor(public fb: FormBuilder,
        public validationService: ValidationService,
        public casesService: CasesService,
        public toastr: ToastsManager) {
    }

    ngOnInit() {
        this.loadManageFromGroup();
        this.isManageDataLoaded = true;
    }

    /* Start - Manage Case */
    public sourceOfCaseLookupOptionList: Array<IOption> = [];
    public typesOfCounselingLookupOptionList: Array<IMultiSelectOption> = [];

    public typesOfCounselingLookupOptionList_S: Array<IOption> = [];
    public totalNoOfSessionsLookupOptionList: Array<IOption> = [];
    public totalHoursSpentLookupOptionList: Array<IOption> = [];
    public relationshipWithPMLookupOptionList: Array<IOption> = [];

    private loadManageFromGroup() {
        this.caseManageForm = this.fb.group({

            CaseStatusId: new FormControl(this.caseBook.Manage.CaseStatusId == undefined ? null : this.caseBook.Manage.CaseStatusId.toString()),
            ReferredToWhom: new FormControl(this.caseBook.Manage.ReferredToWhom),
            SourceOfCaseLookupId: new FormControl(this.caseBook.Manage.SourceOfCaseLookupId == undefined ? null : this.caseBook.Manage.SourceOfCaseLookupId.toString()),
            SourceOfCaseDesc: new FormControl(this.caseBook.Manage.SourceOfCaseDesc),

            TypesOfCounselingLookupId: new FormControl(this.caseBook.Manage.TypesOfCounselingLookupId == undefined ? null : this.caseBook.Manage.TypesOfCounselingLookupId.toString()),
            TotalNoOfSessionsLookupId: new FormControl(this.caseBook.Manage.TotalNoOfSessionsLookupId == undefined ? null : this.caseBook.Manage.TotalNoOfSessionsLookupId.toString(), [Validators.maxLength(3), this.validationService.validateNumber, Validators.pattern("^[0-9]*$")]),
            TotalHoursSpentLookupId: new FormControl(this.caseBook.Manage.TotalHoursSpentLookupId == undefined ? null : this.caseBook.Manage.TotalHoursSpentLookupId.toString(), [Validators.maxLength(5), this.validationService.validateNumber, this.validationService.validateTime]),

            ReasonForClosureStatus: new FormControl(this.caseBook.Manage.ReasonForClosureStatus),
            CaseSubject: new FormControl(this.caseBook.Manage.CaseSubject),
            CaseDescription: new FormControl(this.caseBook.Manage.CaseDescription),

            RelationshipWithPMLookupId: new FormControl(this.caseBook.Manage.RelationshipWithPMLookupId == undefined ? null : this.caseBook.Manage.RelationshipWithPMLookupId.toString()),
            ResolutionLog: new FormControl(this.caseBook.Manage.ResolutionLog)
        });
    }

    public onUpdateManage() {
        this.caseBook.Manage.CaseId = this.caseBook.Case.CaseId;
        this.caseBook.Manage.CaseStatusId = this.caseManageForm.controls['CaseStatusId'].value;
        this.caseBook.Manage.ReferredToWhom = this.caseManageForm.controls['ReferredToWhom'].value;
        this.caseBook.Manage.SourceOfCaseLookupId = this.caseManageForm.controls['SourceOfCaseLookupId'].value;
        this.caseBook.Manage.SourceOfCaseDesc = this.caseManageForm.controls['SourceOfCaseDesc'].value;

        //this.caseBook.Manage.TypesOfCounselingLookupId = this.caseManageForm.controls['TypesOfCounselingLookupId'].value;
        this.caseBook.Manage.TotalNoOfSessionsLookupId = this.caseManageForm.controls['TotalNoOfSessionsLookupId'].value;
        this.caseBook.Manage.TotalHoursSpentLookupId = this.caseManageForm.controls['TotalHoursSpentLookupId'].value;

        this.caseBook.Manage.ReasonForClosureStatus = this.caseManageForm.controls['ReasonForClosureStatus'].value;
        this.caseBook.Manage.CaseSubject = this.caseManageForm.controls['CaseSubject'].value;
        this.caseBook.Manage.CaseDescription = this.caseManageForm.controls['CaseDescription'].value;

        this.caseBook.Manage.RelationshipWithPMLookupId = this.caseManageForm.controls['RelationshipWithPMLookupId'].value;
        this.caseBook.Manage.ResolutionLog = this.caseManageForm.controls['ResolutionLog'].value;


        this.casesService
            .updateCase(this.caseBook).subscribe(data => {
                //this.getCaseById();
                this.caseBook.Manage.CaseManageId = data;
                this.toastr.success('Case info updated successfully');

            }, (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }

    /* End of - Manage Case */
}