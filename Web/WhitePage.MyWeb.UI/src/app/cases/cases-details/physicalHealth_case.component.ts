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
    selector: 'physicalHealthCase',
    templateUrl: 'PhysicalHealth_case.component.html',
    inputs: ['caseBook'],
})

export class PhysicalHealthCaseComponent implements OnInit {
    public caseBook: CaseBook;
    public physicalHealthForm: FormGroup;
    public isPhysicalHealthDataLoaded: boolean = false;

    public sleepPerNightLookupOptionsList: Array<IOption> = [];
    public appetiteLookupOptionsList: Array<IOption> = [];
    public exerciseLookupOptionsList: Array<IOption> = [];
    public reasonForSeekingHelpLookupOptionsList: Array<IMultiSelectOption> = [];
    public whoIsAbusingYouLookupOptionsList: Array<IMultiSelectOption> = [];
    public yesNoOptionsList: Array<IOption> = [];

    constructor(public fb: FormBuilder,
        public validationService: ValidationService,
        public casesService: CasesService,
        public toastr: ToastsManager) {

        this.sleepPerNightLookupOptionsList = BaseCaseController.staticParseLookups("SleepPerNight");
        this.appetiteLookupOptionsList = BaseCaseController.staticParseLookups("Appetite");
        this.exerciseLookupOptionsList = BaseCaseController.staticParseLookups("Exercise");
        this.reasonForSeekingHelpLookupOptionsList = BaseCaseController.staticParseMultiLookups("ReasonForSeekingHelp");
        this.whoIsAbusingYouLookupOptionsList = BaseCaseController.staticParseMultiLookups("AbusingPerson");
        this.yesNoOptionsList = BaseCaseController.staticParseLookups("YesNo");
    }

    ngOnInit() {
        this.loadPhysicalHealthFromGroup();
        this.isPhysicalHealthDataLoaded = true;
    }

    /* Physical Health */


    private loadPhysicalHealthFromGroup() {
        this.physicalHealthForm = this.fb.group({
            SufferingFromAnyMajorIllnessLookupId: new FormControl(this.caseBook.PhysicalHealth.SufferingFromAnyMajorIllnessLookupId == undefined ? null : this.caseBook.PhysicalHealth.SufferingFromAnyMajorIllnessLookupId.toString()),
            SufferingFromAnyMajorIllnessDesc: new FormControl(this.caseBook.PhysicalHealth.SufferingFromAnyMajorIllnessDesc),

            DiagnosedPsychiatricIllnessLookupId: new FormControl(this.caseBook.PhysicalHealth.DiagnosedPsychiatricIllnessLookupId == undefined ? null : this.caseBook.PhysicalHealth.DiagnosedPsychiatricIllnessLookupId.toString()),
            DiagnosedPsychiatricIllnessDesc: new FormControl(this.caseBook.PhysicalHealth.DiagnosedPsychiatricIllnessDesc),

            SleepPerNightLookupId: new FormControl(this.caseBook.PhysicalHealth.SleepPerNightLookupId == undefined ? null : this.caseBook.PhysicalHealth.SleepPerNightLookupId.toString()),
            AppetiteLookupId: new FormControl(this.caseBook.PhysicalHealth.AppetiteLookupId == undefined ? null : this.caseBook.PhysicalHealth.AppetiteLookupId.toString()),
            ExerciseLookupId: new FormControl(this.caseBook.PhysicalHealth.ExerciseLookupId == undefined ? null : this.caseBook.PhysicalHealth.ExerciseLookupId.toString()),

            AnyMedicationLookupId: new FormControl(this.caseBook.PhysicalHealth.AnyMedicationLookupId == undefined ? null : this.caseBook.PhysicalHealth.AnyMedicationLookupId.toString()),
            AnyMedicationDesc: new FormControl(this.caseBook.PhysicalHealth.AnyMedicationDesc),

            AnySubstanceLookupId: new FormControl(this.caseBook.PhysicalHealth.AnySubstanceLookupId == undefined ? null : this.caseBook.PhysicalHealth.AnySubstanceLookupId.toString()),
            AnySubstanceDesc: new FormControl(this.caseBook.PhysicalHealth.AnySubstanceDesc),

            CurrentlyPregnantLookup: new FormControl(this.caseBook.PhysicalHealth.CurrentlyPregnantLookup == undefined ? null : this.caseBook.PhysicalHealth.CurrentlyPregnantLookup.toString()),
            CurrentlyPregnantDesc: new FormControl(this.caseBook.PhysicalHealth.CurrentlyPregnantDesc),

            ReasonForSeekingHelpLookupId: new FormControl(this.caseBook.PhysicalHealth.ReasonForSeekingHelpLookupId == undefined ? null : this.caseBook.PhysicalHealth.ReasonForSeekingHelpLookupId.toString()),
            WhoIsAbusingYouLookupId: new FormControl(this.caseBook.PhysicalHealth.WhoIsAbusingYouLookupId == undefined ? null : this.caseBook.PhysicalHealth.WhoIsAbusingYouLookupId.toString()),
            WhoIsAbusingYouDesc: new FormControl(this.caseBook.PhysicalHealth.WhoIsAbusingYouDesc == undefined ? null : this.caseBook.PhysicalHealth.WhoIsAbusingYouDesc.toString()),
            ReasonForSeekingHelpDesc: new FormControl(this.caseBook.PhysicalHealth.ReasonForSeekingHelpDesc == undefined ? null : this.caseBook.PhysicalHealth.ReasonForSeekingHelpDesc.toString())
        });
    }

    public onUpdatePhysicalHealth() {
        this.caseBook.PhysicalHealth.SufferingFromAnyMajorIllnessLookupId = this.physicalHealthForm.controls['SufferingFromAnyMajorIllnessLookupId'].value;
        this.caseBook.PhysicalHealth.SufferingFromAnyMajorIllnessDesc = this.physicalHealthForm.controls['SufferingFromAnyMajorIllnessDesc'].value;
        this.caseBook.PhysicalHealth.DiagnosedPsychiatricIllnessLookupId = this.physicalHealthForm.controls['DiagnosedPsychiatricIllnessLookupId'].value;
        this.caseBook.PhysicalHealth.DiagnosedPsychiatricIllnessDesc = this.physicalHealthForm.controls['DiagnosedPsychiatricIllnessDesc'].value;

        this.caseBook.PhysicalHealth.SleepPerNightLookupId = this.physicalHealthForm.controls['SleepPerNightLookupId'].value;
        this.caseBook.PhysicalHealth.AppetiteLookupId = this.physicalHealthForm.controls['AppetiteLookupId'].value;
        this.caseBook.PhysicalHealth.ExerciseLookupId = this.physicalHealthForm.controls['ExerciseLookupId'].value;

        this.caseBook.PhysicalHealth.AnyMedicationLookupId = this.physicalHealthForm.controls['AnyMedicationLookupId'].value;
        this.caseBook.PhysicalHealth.AnyMedicationDesc = this.physicalHealthForm.controls['AnyMedicationDesc'].value;

        this.caseBook.PhysicalHealth.AnySubstanceLookupId = this.physicalHealthForm.controls['AnySubstanceLookupId'].value;
        this.caseBook.PhysicalHealth.AnySubstanceDesc = this.physicalHealthForm.controls['AnySubstanceDesc'].value;

        this.caseBook.PhysicalHealth.CurrentlyPregnantLookup = this.physicalHealthForm.controls['CurrentlyPregnantLookup'].value;
        this.caseBook.PhysicalHealth.CurrentlyPregnantDesc = this.physicalHealthForm.controls['CurrentlyPregnantDesc'].value;

        //this.caseBook.PhysicalHealth.ReasonForSeekingHelpLookupId = this.physicalHealthForm.controls['ReasonForSeekingHelpLookupId'].value;
        //this.caseBook.PhysicalHealth.WhoIsAbusingYouLookupId = this.physicalHealthForm.controls['WhoIsAbusingYouLookupId'].value;
        this.caseBook.PhysicalHealth.WhoIsAbusingYouDesc = this.physicalHealthForm.controls['WhoIsAbusingYouDesc'].value;
        this.caseBook.PhysicalHealth.ReasonForSeekingHelpDesc = this.physicalHealthForm.controls['ReasonForSeekingHelpDesc'].value;

        this.casesService
            .updatePhysicalHealth(this.caseBook).subscribe(data => {
                this.toastr.success('Physical updated successfully');
            }, (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }
    /* End of - Physical Health */
}