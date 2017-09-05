import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { CaseBook, Case, CaseAddress, vCaseAddress, CaseFeedback, CaseMental, vCaseMental } from '../../models/case.entities';

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
    selector: 'mentalCase',
    templateUrl: 'legal_case.component.html',
    inputs: ['caseBook'],
})

export class MentalCaseComponent implements OnInit {
    public caseBook: CaseBook;
    public caseMentalForm: FormGroup;
    public isCaseBookDataLoaded: boolean = false;
    public sourceOfCaseLookupOptionList: Array<IOption> = [];
    public typesOfCounselingLookupOptionList: Array<IMultiSelectOption> = [];
    public typesOfCounselingLookupOptionList_S: Array<IOption> = [];
    public relationshipWithPMLookupOptionList: Array<IOption> = [];

    constructor(public fb: FormBuilder,
        public validationService: ValidationService,
        public casesService: CasesService,
        public toastr: ToastsManager) {

        this.sourceOfCaseLookupOptionList = BaseCaseController.staticParseLookups("SourceOfCase");
        this.typesOfCounselingLookupOptionList = BaseCaseController.staticParseMultiLookups("TypesOfCounselling");
        this.typesOfCounselingLookupOptionList_S = BaseCaseController.staticParseLookups("TypesOfCounselling");
        this.relationshipWithPMLookupOptionList = BaseCaseController.staticParseLookups("RelationshipWithPM");
    }

    ngOnInit() {
        this.isCaseBookDataLoaded = true;
    }

    /* Start - Mental */
    public MentalDressLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalHygieneLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalBodyTypeLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalExpressionLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalMotorActivityLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalVocabularyLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalImpulseControlLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalSpeechLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalBehaviourLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalContentLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalFlowOfThoughtLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalOrientationLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalEstimatedIntellectLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalAttentionLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalInsightLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalJudgementLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalMemoryLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalInformationLookupOptionList: Array<IMultiSelectOption> = [];
    public MentalAbstractionLookupOptionList: Array<IMultiSelectOption> = [];

    @ViewChild('mentalModal') public mentalModal: ModalDirective;

    public addNewMental() {
        this.caseBook.SelectedMental = new CaseMental();
        this.caseBook.SelectedMental.CaseId = this.caseBook.Case.CaseId;

        this.caseMentalForm = this.fb.group({
            MentalAbstractionLookupId: new FormControl(this.caseBook.SelectedMental.MentalAbstractionLookupId == undefined ? null : this.caseBook.SelectedMental.MentalAbstractionLookupId.toString()),
            MentalAttentionLookupId: new FormControl(this.caseBook.SelectedMental.MentalAttentionLookupId == undefined ? null : this.caseBook.SelectedMental.MentalAttentionLookupId.toString()),
            MentalBehaviourLookupId: new FormControl(this.caseBook.SelectedMental.MentalBehaviourLookupId == undefined ? null : this.caseBook.SelectedMental.MentalBehaviourLookupId.toString()),
            MentalBodyTypeLookupId: new FormControl(this.caseBook.SelectedMental.MentalBodyTypeLookupId == undefined ? null : this.caseBook.SelectedMental.MentalBodyTypeLookupId.toString()),

            MentalContentLookupId: new FormControl(this.caseBook.SelectedMental.MentalContentLookupId == undefined ? null : this.caseBook.SelectedMental.MentalContentLookupId.toString()),
            MentalDressLookupId: new FormControl(this.caseBook.SelectedMental.MentalDressLookupId == undefined ? null : this.caseBook.SelectedMental.MentalDressLookupId.toString()),
            MentalEstimatedIntellectLookupId: new FormControl(this.caseBook.SelectedMental.MentalEstimatedIntellectLookupId == undefined ? null : this.caseBook.SelectedMental.MentalEstimatedIntellectLookupId.toString()),
            MentalExpressionLookupId: new FormControl(this.caseBook.SelectedMental.MentalExpressionLookupId == undefined ? null : this.caseBook.SelectedMental.MentalExpressionLookupId.toString()),

            MentalFlowOfThoughtLookupId: new FormControl(this.caseBook.SelectedMental.MentalFlowOfThoughtLookupId == undefined ? null : this.caseBook.SelectedMental.MentalFlowOfThoughtLookupId.toString()),
            MentalHygieneLookupId: new FormControl(this.caseBook.SelectedMental.MentalHygieneLookupId == undefined ? null : this.caseBook.SelectedMental.MentalHygieneLookupId.toString()),
            MentalImpulseControlLookupId: new FormControl(this.caseBook.SelectedMental.MentalImpulseControlLookupId == undefined ? null : this.caseBook.SelectedMental.MentalImpulseControlLookupId.toString()),
            MentalInformationLookupId: new FormControl(this.caseBook.SelectedMental.MentalInformationLookupId == undefined ? null : this.caseBook.SelectedMental.MentalInformationLookupId.toString()),

            MentalInsightLookupId: new FormControl(this.caseBook.SelectedMental.MentalInsightLookupId == undefined ? null : this.caseBook.SelectedMental.MentalInsightLookupId.toString()),
            MentalJudgementLookupId: new FormControl(this.caseBook.SelectedMental.MentalJudgementLookupId == undefined ? null : this.caseBook.SelectedMental.MentalJudgementLookupId.toString()),
            MentalMemoryLookupId: new FormControl(this.caseBook.SelectedMental.MentalMemoryLookupId == undefined ? null : this.caseBook.SelectedMental.MentalMemoryLookupId.toString()),
            MentalMotorActivityLookupId: new FormControl(this.caseBook.SelectedMental.MentalMotorActivityLookupId == undefined ? null : this.caseBook.SelectedMental.MentalMotorActivityLookupId.toString()),

            MentalOrientationLookupId: new FormControl(this.caseBook.SelectedMental.MentalOrientationLookupId == undefined ? null : this.caseBook.SelectedMental.MentalOrientationLookupId.toString()),
            MentalSpeechLookupId: new FormControl(this.caseBook.SelectedMental.MentalSpeechLookupId == undefined ? null : this.caseBook.SelectedMental.MentalSpeechLookupId.toString()),
            MentalVocabularyLookupId: new FormControl(this.caseBook.SelectedMental.MentalVocabularyLookupId == undefined ? null : this.caseBook.SelectedMental.MentalVocabularyLookupId.toString())
        });
        this.mentalModal.show();
    }

    public editMental(caseMental: vCaseMental) {
        this.caseBook.SelectedMental.CaseMentalId = caseMental.CaseMentalId;
        this.caseBook.SelectedMental.CaseId = caseMental.CaseId;

        this.caseBook.SelectedMental.MentalAbstractionLookupId = caseMental.MentalAbstractionLookupId;
        this.caseBook.SelectedMental.MentalAttentionLookupId = caseMental.MentalAttentionLookupId;
        this.caseBook.SelectedMental.MentalBehaviourLookupId = caseMental.MentalBehaviourLookupId;
        this.caseBook.SelectedMental.MentalBodyTypeLookupId = caseMental.MentalBodyTypeLookupId;

        this.caseBook.SelectedMental.MentalContentLookupId = caseMental.MentalContentLookupId;
        this.caseBook.SelectedMental.MentalDressLookupId = caseMental.MentalDressLookupId;
        this.caseBook.SelectedMental.MentalEstimatedIntellectLookupId = caseMental.MentalEstimatedIntellectLookupId;
        this.caseBook.SelectedMental.MentalExpressionLookupId = caseMental.MentalExpressionLookupId;

        this.caseBook.SelectedMental.MentalFlowOfThoughtLookupId = caseMental.MentalFlowOfThoughtLookupId;
        this.caseBook.SelectedMental.MentalHygieneLookupId = caseMental.MentalHygieneLookupId;
        this.caseBook.SelectedMental.MentalImpulseControlLookupId = caseMental.MentalImpulseControlLookupId;
        this.caseBook.SelectedMental.MentalInformationLookupId = caseMental.MentalInformationLookupId;

        this.caseBook.SelectedMental.MentalInsightLookupId = caseMental.MentalInsightLookupId;
        this.caseBook.SelectedMental.MentalJudgementLookupId = caseMental.MentalJudgementLookupId;
        this.caseBook.SelectedMental.MentalMemoryLookupId = caseMental.MentalMemoryLookupId;
        this.caseBook.SelectedMental.MentalMotorActivityLookupId = caseMental.MentalMotorActivityLookupId;

        this.caseBook.SelectedMental.MentalOrientationLookupId = caseMental.MentalOrientationLookupId;
        this.caseBook.SelectedMental.MentalSpeechLookupId = caseMental.MentalSpeechLookupId;
        this.caseBook.SelectedMental.MentalVocabularyLookupId = caseMental.MentalVocabularyLookupId;

        this.caseMentalForm = this.fb.group({
            MentalAbstractionLookupId: new FormControl(this.caseBook.SelectedMental.MentalAbstractionLookupId == undefined ? null : this.caseBook.SelectedMental.MentalAbstractionLookupId.toString()),
            MentalAttentionLookupId: new FormControl(this.caseBook.SelectedMental.MentalAttentionLookupId == undefined ? null : this.caseBook.SelectedMental.MentalAttentionLookupId.toString()),
            MentalBehaviourLookupId: new FormControl(this.caseBook.SelectedMental.MentalBehaviourLookupId == undefined ? null : this.caseBook.SelectedMental.MentalBehaviourLookupId.toString()),
            MentalBodyTypeLookupId: new FormControl(this.caseBook.SelectedMental.MentalBodyTypeLookupId == undefined ? null : this.caseBook.SelectedMental.MentalBodyTypeLookupId.toString()),
            MentalContentLookupId: new FormControl(this.caseBook.SelectedMental.MentalContentLookupId == undefined ? null : this.caseBook.SelectedMental.MentalContentLookupId.toString()),
            MentalDressLookupId: new FormControl(this.caseBook.SelectedMental.MentalDressLookupId == undefined ? null : this.caseBook.SelectedMental.MentalDressLookupId.toString()),
            MentalEstimatedIntellectLookupId: new FormControl(this.caseBook.SelectedMental.MentalEstimatedIntellectLookupId == undefined ? null : this.caseBook.SelectedMental.MentalEstimatedIntellectLookupId.toString()),
            MentalExpressionLookupId: new FormControl(this.caseBook.SelectedMental.MentalExpressionLookupId == undefined ? null : this.caseBook.SelectedMental.MentalExpressionLookupId.toString()),
            MentalFlowOfThoughtLookupId: new FormControl(this.caseBook.SelectedMental.MentalFlowOfThoughtLookupId == undefined ? null : this.caseBook.SelectedMental.MentalFlowOfThoughtLookupId.toString()),
            MentalHygieneLookupId: new FormControl(this.caseBook.SelectedMental.MentalHygieneLookupId == undefined ? null : this.caseBook.SelectedMental.MentalHygieneLookupId.toString()),
            MentalImpulseControlLookupId: new FormControl(this.caseBook.SelectedMental.MentalImpulseControlLookupId == undefined ? null : this.caseBook.SelectedMental.MentalImpulseControlLookupId.toString()),
            MentalInformationLookupId: new FormControl(this.caseBook.SelectedMental.MentalInformationLookupId == undefined ? null : this.caseBook.SelectedMental.MentalInformationLookupId.toString()),
            MentalInsightLookupId: new FormControl(this.caseBook.SelectedMental.MentalInsightLookupId == undefined ? null : this.caseBook.SelectedMental.MentalInsightLookupId.toString()),
            MentalJudgementLookupId: new FormControl(this.caseBook.SelectedMental.MentalJudgementLookupId == undefined ? null : this.caseBook.SelectedMental.MentalJudgementLookupId.toString()),
            MentalMemoryLookupId: new FormControl(this.caseBook.SelectedMental.MentalMemoryLookupId == undefined ? null : this.caseBook.SelectedMental.MentalMemoryLookupId.toString()),
            MentalMotorActivityLookupId: new FormControl(this.caseBook.SelectedMental.MentalMotorActivityLookupId == undefined ? null : this.caseBook.SelectedMental.MentalMotorActivityLookupId.toString()),
            MentalOrientationLookupId: new FormControl(this.caseBook.SelectedMental.MentalOrientationLookupId == undefined ? null : this.caseBook.SelectedMental.MentalOrientationLookupId.toString()),
            MentalSpeechLookupId: new FormControl(this.caseBook.SelectedMental.MentalSpeechLookupId == undefined ? null : this.caseBook.SelectedMental.MentalSpeechLookupId.toString()),
            MentalVocabularyLookupId: new FormControl(this.caseBook.SelectedMental.MentalVocabularyLookupId == undefined ? null : this.caseBook.SelectedMental.MentalVocabularyLookupId.toString())
        });
        this.mentalModal.show();
    }

    public hideMentalModal(): void {
        this.mentalModal.hide();
    }

    public saveMental(caseMental: CaseMental) {
        this.casesService
            .updateMental(this.caseBook).subscribe(data => {
                this.mentalModal.hide();
                this.caseBook.vMental.push(data);
                this.toastr.success('Mental Status updated successfully');

            }, (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }
    /* End of - Mental */
}