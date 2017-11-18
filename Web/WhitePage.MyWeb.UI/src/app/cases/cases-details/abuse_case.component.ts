import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModule, IOption } from 'ng-select';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { ValidationService } from '../../services/validation.service';
import { CasesService } from '../../services/cases.services';

import { BaseCaseController } from './../basecase.controller';

import { CaseBook, Case } from '../../models/case.entities';


@Component({
    selector: 'abuseCase',
    templateUrl: 'abuse_case.component.html',
    inputs: ['caseBook'],
})

export class AbuseCaseComponent implements OnInit {
    public caseBook: CaseBook;
    public caseAbuseForm: FormGroup;
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
    public relationshipWithVictimLookupOptionsList: Array<IOption> = [];

    constructor(
        public fb: FormBuilder,
        private validationService: ValidationService,
        private casesService: CasesService,
        public toastr: ToastsManager) {

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
        this.loadAbuseFromGroup();
        this.isAbuseDataLoaded = true;
    }

    private returnValue(input: any) {
        return input == undefined ? null : input.toString()
    }

    private loadAbuseFromGroup() {
        this.caseAbuseForm = this.fb.group({
            SufferingFromAbuseLookupId: [this.returnValue(this.caseBook.Abuse.SufferingFromAbuseLookupId)],
            SufferingFromAbuseDesc: [this.caseBook.Abuse.SufferingFromAbuseDesc],

            FeelAboutAbuseLookupId: [this.returnValue(this.caseBook.Abuse.FeelAboutAbuseLookupId)],
            ParentsFeelAboutAbuseLookupId: [this.returnValue(this.caseBook.Abuse.ParentsFeelAboutAbuseLookupId)],
            LawFeelAboutAbuseLookupId: [this.returnValue(this.caseBook.Abuse.LawFeelAboutAbuseLookupId)],
            SignsOfPhysicalAbuseLookupId: [this.returnValue(this.caseBook.Abuse.SignsOfPhysicalAbuseLookupId)],
            SignsOfPhysicalAbuseDesc: [this.caseBook.Abuse.SignsOfPhysicalAbuseDesc],

            WeaponsUsedLookupId: [this.returnValue(this.caseBook.Abuse.WeaponsUsedLookupId)],
            WeaponsUsedDesc: [this.caseBook.Abuse.WeaponsUsedDesc],

            TypesOfPhyscialAbuseLookupId: [this.returnValue(this.caseBook.Abuse.TypesOfPhyscialAbuseLookupId)],
            FrequencyOfPhyscialAbuseLookupId: [this.returnValue(this.caseBook.Abuse.FrequencyOfPhyscialAbuseLookupId)],
            NumberOfYearsOfPhyscialAbuse: [this.returnValue(this.caseBook.Abuse.NumberOfYearsOfPhyscialAbuse), [Validators.maxLength(2), this.validationService.validateNumber]],

            TypesOfEmotionalAbuseLookupId: [this.returnValue(this.caseBook.Abuse.TypesOfEmotionalAbuseLookupId)],
            FrequencyOfEmotionalAbuseLookupId: [this.returnValue(this.caseBook.Abuse.FrequencyOfEmotionalAbuseLookupId)],
            NumberOfYearsOfEmotionalAbuse: [this.returnValue(this.caseBook.Abuse.NumberOfYearsOfEmotionalAbuse), [Validators.maxLength(2), this.validationService.validateNumber]],

            TypesOfSexualAbuseLookupId: [this.returnValue(this.caseBook.Abuse.TypesOfSexualAbuseLookupId)],
            FrequencyOfSexualAbuseLookupId: [this.returnValue(this.caseBook.Abuse.FrequencyOfSexualAbuseLookupId)],
            NumberOfYearsOfSexualAbuse: [this.returnValue(this.caseBook.Abuse.NumberOfYearsOfSexualAbuse), [Validators.maxLength(2), this.validationService.validateNumber]],

            TypesOfEconomicAbuseLookupId: [this.returnValue(this.caseBook.Abuse.TypesOfEconomicAbuseLookupId)],
            FrequencyOfEconomicAbuseLookupId: [this.returnValue(this.caseBook.Abuse.FrequencyOfEconomicAbuseLookupId)],
            NumberOfYearsOfEconomicAbuse: [this.returnValue(this.caseBook.Abuse.NumberOfYearsOfEconomicAbuse), [Validators.maxLength(2), this.validationService.validateNumber]],

            ReasonsForAbuseLookupId: [this.returnValue(this.caseBook.Abuse.ReasonsForAbuseLookupId)],
            ReasonForAbuseDesc: [this.caseBook.Abuse.ReasonForAbuseDesc],

            PhysicalAbuseDesc: [this.caseBook.Abuse.PhysicalAbuseDesc],
            EmotionalAbuseDesc: [this.caseBook.Abuse.EmotionalAbuseDesc],
            SexualAbuseDesc: [this.caseBook.Abuse.SexualAbuseDesc],
            EconomicAbuseDesc: [this.caseBook.Abuse.EconomicAbuseDesc],
        });
    }

    public onUpdateAbuse() {
        this.caseBook.Abuse.SufferingFromAbuseLookupId = this.caseAbuseForm.controls['SufferingFromAbuseLookupId'].value;
        this.caseBook.Abuse.SufferingFromAbuseDesc = this.caseAbuseForm.controls['SufferingFromAbuseDesc'].value;
        this.caseBook.Abuse.SignsOfPhysicalAbuseLookupId = this.caseAbuseForm.controls['SignsOfPhysicalAbuseLookupId'].value;
        this.caseBook.Abuse.SignsOfPhysicalAbuseDesc = this.caseAbuseForm.controls['SignsOfPhysicalAbuseDesc'].value;
        this.caseBook.Abuse.WeaponsUsedDesc = this.caseAbuseForm.controls['WeaponsUsedDesc'].value;
        this.caseBook.Abuse.FrequencyOfPhyscialAbuseLookupId = this.caseAbuseForm.controls['FrequencyOfPhyscialAbuseLookupId'].value;
        this.caseBook.Abuse.NumberOfYearsOfPhyscialAbuse = this.caseAbuseForm.controls['NumberOfYearsOfPhyscialAbuse'].value;
        this.caseBook.Abuse.FrequencyOfEmotionalAbuseLookupId = this.caseAbuseForm.controls['FrequencyOfEmotionalAbuseLookupId'].value;
        this.caseBook.Abuse.NumberOfYearsOfEmotionalAbuse = this.caseAbuseForm.controls['NumberOfYearsOfEmotionalAbuse'].value;
        this.caseBook.Abuse.FrequencyOfSexualAbuseLookupId = this.caseAbuseForm.controls['FrequencyOfSexualAbuseLookupId'].value;
        this.caseBook.Abuse.NumberOfYearsOfSexualAbuse = this.caseAbuseForm.controls['NumberOfYearsOfSexualAbuse'].value;
        this.caseBook.Abuse.FrequencyOfEconomicAbuseLookupId = this.caseAbuseForm.controls['FrequencyOfEconomicAbuseLookupId'].value;
        this.caseBook.Abuse.NumberOfYearsOfEconomicAbuse = this.caseAbuseForm.controls['NumberOfYearsOfEconomicAbuse'].value;
        this.caseBook.Abuse.ReasonForAbuseDesc = this.caseAbuseForm.controls['ReasonForAbuseDesc'].value;
        this.caseBook.Abuse.PhysicalAbuseDesc = this.caseAbuseForm.controls['PhysicalAbuseDesc'].value;
        this.caseBook.Abuse.EmotionalAbuseDesc = this.caseAbuseForm.controls['EmotionalAbuseDesc'].value;
        this.caseBook.Abuse.SexualAbuseDesc = this.caseAbuseForm.controls['SexualAbuseDesc'].value;
        this.caseBook.Abuse.EconomicAbuseDesc = this.caseAbuseForm.controls['EconomicAbuseDesc'].value;

        this.casesService.updateAbuse(this.caseBook).subscribe(
            data => {
                this.toastr.success('Abuse information updated successfully');
            },
            error => {
                this.toastr.error("Error while updating case, " + error);
            }
        );
    }
}