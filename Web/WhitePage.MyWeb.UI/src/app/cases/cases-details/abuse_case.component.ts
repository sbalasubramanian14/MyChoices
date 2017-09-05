import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { CaseBook, Case, CaseAddress, vCaseAddress } from '../../models/case.entities';

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
    selector: 'abuseCase',
    templateUrl: 'abuse_case.component.html',
    inputs: ['caseBook'],
})

export class AbuseCaseComponent implements OnInit {
    public caseBook: CaseBook;
    public caseAbuseForm: FormGroup;
    public isAbuseDataLoaded: boolean = false;

    constructor(public fb: FormBuilder,
        public validationService: ValidationService,
        public casesService: CasesService,
        public toastr: ToastsManager) {
    }

    ngOnInit() {
        this.loadAbuseFromGroup();
        this.isAbuseDataLoaded = true;
    }

    /* Start - Abuse */
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
    public relationshipWithVictimLookupOptionsList: Array<IOption> = [];

    private loadAbuseFromGroup() {
        this.caseAbuseForm = this.fb.group({
            SufferingFromAbuseLookupId: new FormControl(this.caseBook.Abuse.SufferingFromAbuseLookupId == undefined ? null : this.caseBook.Abuse.SufferingFromAbuseLookupId.toString()),
            SufferingFromAbuseDesc: new FormControl(this.caseBook.Abuse.SufferingFromAbuseDesc),

            FeelAboutAbuseLookupId: new FormControl(this.caseBook.Abuse.FeelAboutAbuseLookupId == undefined ? null : this.caseBook.Abuse.FeelAboutAbuseLookupId.toString()),
            ParentsFeelAboutAbuseLookupId: new FormControl(this.caseBook.Abuse.ParentsFeelAboutAbuseLookupId == undefined ? null : this.caseBook.Abuse.ParentsFeelAboutAbuseLookupId.toString()),
            LawFeelAboutAbuseLookupId: new FormControl(this.caseBook.Abuse.LawFeelAboutAbuseLookupId == undefined ? null : this.caseBook.Abuse.LawFeelAboutAbuseLookupId.toString()),
            SignsOfPhysicalAbuseLookupId: new FormControl(this.caseBook.Abuse.SignsOfPhysicalAbuseLookupId == undefined ? null : this.caseBook.Abuse.SignsOfPhysicalAbuseLookupId.toString()),
            SignsOfPhysicalAbuseDesc: new FormControl(this.caseBook.Abuse.SignsOfPhysicalAbuseDesc),

            WeaponsUsedLookupId: new FormControl(this.caseBook.Abuse.WeaponsUsedLookupId == undefined ? null : this.caseBook.Abuse.WeaponsUsedLookupId.toString()),
            WeaponsUsedDesc: new FormControl(this.caseBook.Abuse.WeaponsUsedDesc),

            TypesOfPhyscialAbuseLookupId: new FormControl(this.caseBook.Abuse.TypesOfPhyscialAbuseLookupId == undefined ? null : this.caseBook.Abuse.TypesOfPhyscialAbuseLookupId.toString()),
            FrequencyOfPhyscialAbuseLookupId: new FormControl(this.caseBook.Abuse.FrequencyOfPhyscialAbuseLookupId == undefined ? null : this.caseBook.Abuse.FrequencyOfPhyscialAbuseLookupId.toString()),
            NumberOfYearsOfPhyscialAbuse: new FormControl(this.caseBook.Abuse.NumberOfYearsOfPhyscialAbuse == undefined ? null : this.caseBook.Abuse.NumberOfYearsOfPhyscialAbuse.toString(), [Validators.maxLength(2), this.validationService.validateNumber]),

            TypesOfEmotionalAbuseLookupId: new FormControl(this.caseBook.Abuse.TypesOfEmotionalAbuseLookupId == undefined ? null : this.caseBook.Abuse.TypesOfEmotionalAbuseLookupId.toString()),
            FrequencyOfEmotionalAbuseLookupId: new FormControl(this.caseBook.Abuse.FrequencyOfEmotionalAbuseLookupId == undefined ? null : this.caseBook.Abuse.FrequencyOfEmotionalAbuseLookupId.toString()),
            NumberOfYearsOfEmotionalAbuse: new FormControl(this.caseBook.Abuse.NumberOfYearsOfEmotionalAbuse == undefined ? null : this.caseBook.Abuse.NumberOfYearsOfEmotionalAbuse.toString(), [Validators.maxLength(2), this.validationService.validateNumber]),

            TypesOfSexualAbuseLookupId: new FormControl(this.caseBook.Abuse.TypesOfSexualAbuseLookupId == undefined ? null : this.caseBook.Abuse.TypesOfSexualAbuseLookupId.toString()),
            FrequencyOfSexualAbuseLookupId: new FormControl(this.caseBook.Abuse.FrequencyOfSexualAbuseLookupId == undefined ? null : this.caseBook.Abuse.FrequencyOfSexualAbuseLookupId.toString()),
            NumberOfYearsOfSexualAbuse: new FormControl(this.caseBook.Abuse.NumberOfYearsOfSexualAbuse == undefined ? null : this.caseBook.Abuse.NumberOfYearsOfSexualAbuse.toString(), [Validators.maxLength(2), this.validationService.validateNumber]),

            TypesOfEconomicAbuseLookupId: new FormControl(this.caseBook.Abuse.TypesOfEconomicAbuseLookupId == undefined ? null : this.caseBook.Abuse.TypesOfEconomicAbuseLookupId.toString()),
            FrequencyOfEconomicAbuseLookupId: new FormControl(this.caseBook.Abuse.FrequencyOfEconomicAbuseLookupId == undefined ? null : this.caseBook.Abuse.FrequencyOfEconomicAbuseLookupId.toString()),
            NumberOfYearsOfEconomicAbuse: new FormControl(this.caseBook.Abuse.NumberOfYearsOfEconomicAbuse == undefined ? null : this.caseBook.Abuse.NumberOfYearsOfEconomicAbuse.toString(), [Validators.maxLength(2), this.validationService.validateNumber]),

            ReasonsForAbuseLookupId: new FormControl(this.caseBook.Abuse.ReasonsForAbuseLookupId == undefined ? null : this.caseBook.Abuse.ReasonsForAbuseLookupId.toString()),
            ReasonForAbuseDesc: new FormControl(this.caseBook.Abuse.ReasonForAbuseDesc)
        });
    }

    public onUpdateAbuse() {
        this.caseBook.Abuse.SufferingFromAbuseLookupId = this.caseAbuseForm.controls['SufferingFromAbuseLookupId'].value;
        this.caseBook.Abuse.SufferingFromAbuseDesc = this.caseAbuseForm.controls['SufferingFromAbuseDesc'].value;

        //this.caseBook.Abuse.FeelAboutAbuseLookupId = this.caseAbuseForm.controls['FeelAboutAbuseLookupId'].value;
        //this.caseBook.Abuse.ParentsFeelAboutAbuseLookupId = this.caseAbuseForm.controls['ParentsFeelAboutAbuseLookupId'].value;
        //this.caseBook.Abuse.LawFeelAboutAbuseLookupId = this.caseAbuseForm.controls['LawFeelAboutAbuseLookupId'].value;

        this.caseBook.Abuse.SignsOfPhysicalAbuseLookupId = this.caseAbuseForm.controls['SignsOfPhysicalAbuseLookupId'].value;
        this.caseBook.Abuse.SignsOfPhysicalAbuseDesc = this.caseAbuseForm.controls['SignsOfPhysicalAbuseDesc'].value;

        //this.caseBook.Abuse.WeaponsUsedLookupId = this.caseAbuseForm.controls['WeaponsUsedLookupId'].value;
        this.caseBook.Abuse.WeaponsUsedDesc = this.caseAbuseForm.controls['WeaponsUsedDesc'].value;

        //this.caseBook.Abuse.TypesOfPhyscialAbuseLookupId = this.caseAbuseForm.controls['TypesOfPhyscialAbuseLookupId'].value;
        this.caseBook.Abuse.FrequencyOfPhyscialAbuseLookupId = this.caseAbuseForm.controls['FrequencyOfPhyscialAbuseLookupId'].value;
        this.caseBook.Abuse.NumberOfYearsOfPhyscialAbuse = this.caseAbuseForm.controls['NumberOfYearsOfPhyscialAbuse'].value;

        //this.caseBook.Abuse.TypesOfEmotionalAbuseLookupId = this.caseAbuseForm.controls['TypesOfEmotionalAbuseLookupId'].value;
        this.caseBook.Abuse.FrequencyOfEmotionalAbuseLookupId = this.caseAbuseForm.controls['FrequencyOfEmotionalAbuseLookupId'].value;
        this.caseBook.Abuse.NumberOfYearsOfEmotionalAbuse = this.caseAbuseForm.controls['NumberOfYearsOfEmotionalAbuse'].value;

        //this.caseBook.Abuse.TypesOfSexualAbuseLookupId = this.caseAbuseForm.controls['TypesOfSexualAbuseLookupId'].value;
        this.caseBook.Abuse.FrequencyOfSexualAbuseLookupId = this.caseAbuseForm.controls['FrequencyOfSexualAbuseLookupId'].value;
        this.caseBook.Abuse.NumberOfYearsOfSexualAbuse = this.caseAbuseForm.controls['NumberOfYearsOfSexualAbuse'].value;

        //this.caseBook.Abuse.TypesOfEconomicAbuseLookupId = this.caseAbuseForm.controls['TypesOfEconomicAbuseLookupId'].value;
        this.caseBook.Abuse.FrequencyOfEconomicAbuseLookupId = this.caseAbuseForm.controls['FrequencyOfEconomicAbuseLookupId'].value;
        this.caseBook.Abuse.NumberOfYearsOfEconomicAbuse = this.caseAbuseForm.controls['NumberOfYearsOfEconomicAbuse'].value;

        //this.caseBook.Abuse.ReasonsForAbuseLookupId = this.caseAbuseForm.controls['ReasonsForAbuseLookupId'].value;
        this.caseBook.Abuse.ReasonForAbuseDesc = this.caseAbuseForm.controls['ReasonForAbuseDesc'].value;

        this.casesService
            .updateAbuse(this.caseBook).subscribe(data => {
                //this.getCaseById();
                this.toastr.success('Abuse information updated successfully');
            }, (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }

    /* End of - Abuse */
}