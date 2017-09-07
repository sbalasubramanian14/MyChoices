import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { CasesService } from '../../services/cases.services';

import { BaseCaseController } from './../basecase.controller';

import { CaseBook, Case, CaseMental, vCaseMental } from '../../models/case.entities';

@Component({
    selector: 'mentalCase',
    templateUrl: 'mental_case.component.html',
    inputs: ['caseBook'],
})

export class MentalCaseComponent implements OnInit {
    public caseBook: CaseBook;
    public caseMentalForm: FormGroup;
    public isCaseBookDataLoaded: boolean = false;
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

    constructor(
        private fb: FormBuilder,
        private casesService: CasesService,
        private toastr: ToastsManager) {

        this.MentalDressLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalDress");
        this.MentalHygieneLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalHygiene");
        this.MentalBodyTypeLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalBodyType");
        this.MentalExpressionLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalExpression");
        this.MentalMotorActivityLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalMotorActivity");
        this.MentalVocabularyLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalVocabulary");
        this.MentalImpulseControlLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalImpulseControl");
        this.MentalSpeechLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalSpeech");
        this.MentalBehaviourLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalBehaviour");
        this.MentalContentLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalContent");
        this.MentalFlowOfThoughtLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalFlowOfThought");
        this.MentalOrientationLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalOrientation");
        this.MentalEstimatedIntellectLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalEstimatedIntellect");
        this.MentalAttentionLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalAttention");
        this.MentalInsightLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalInsight");
        this.MentalJudgementLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalJudgement");
        this.MentalMemoryLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalMemory");
        this.MentalInformationLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalInformation");
        this.MentalAbstractionLookupOptionList = BaseCaseController.staticParseMultiLookups("MentalAbstraction");
    }

    ngOnInit() {
        this.isCaseBookDataLoaded = true;
    }

    @ViewChild('mentalModal') public mentalModal: ModalDirective;

    private returnValue(input: any) {
        return input ? input.split(';').map(Number) : null;
    }

    public addNewMental() {
        this.caseBook.SelectedMental = new CaseMental();
        this.caseBook.SelectedMental.CaseId = this.caseBook.Case.CaseId;

        this.caseMentalForm = this.fb.group({
            MentalAbstractionLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalAbstractionLookupId)],
            MentalAttentionLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalAttentionLookupId)],
            MentalBehaviourLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalBehaviourLookupId)],
            MentalBodyTypeLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalBodyTypeLookupId)],

            MentalContentLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalContentLookupId)],
            MentalDressLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalDressLookupId)],
            MentalEstimatedIntellectLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalEstimatedIntellectLookupId)],
            MentalExpressionLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalExpressionLookupId)],

            MentalFlowOfThoughtLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalFlowOfThoughtLookupId)],
            MentalHygieneLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalHygieneLookupId)],
            MentalImpulseControlLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalImpulseControlLookupId)],
            MentalInformationLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalInformationLookupId)],

            MentalInsightLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalInsightLookupId)],
            MentalJudgementLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalJudgementLookupId)],
            MentalMemoryLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalMemoryLookupId)],
            MentalMotorActivityLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalMotorActivityLookupId)],

            MentalOrientationLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalOrientationLookupId)],
            MentalSpeechLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalSpeechLookupId)],
            MentalVocabularyLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalVocabularyLookupId)]
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
            MentalAbstractionLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalAbstractionLookupId)],
            MentalAttentionLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalAttentionLookupId)],
            MentalBehaviourLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalBehaviourLookupId)],
            MentalBodyTypeLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalBodyTypeLookupId)],
            MentalContentLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalContentLookupId)],
            MentalDressLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalDressLookupId)],
            MentalEstimatedIntellectLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalEstimatedIntellectLookupId)],
            MentalExpressionLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalExpressionLookupId)],
            MentalFlowOfThoughtLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalFlowOfThoughtLookupId)],
            MentalHygieneLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalHygieneLookupId)],
            MentalImpulseControlLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalImpulseControlLookupId)],
            MentalInformationLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalInformationLookupId)],
            MentalInsightLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalInsightLookupId)],
            MentalJudgementLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalJudgementLookupId)],
            MentalMemoryLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalMemoryLookupId)],
            MentalMotorActivityLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalMotorActivityLookupId)],
            MentalOrientationLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalOrientationLookupId)],
            MentalSpeechLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalSpeechLookupId)],
            MentalVocabularyLookupId: [this.returnValue(this.caseBook.SelectedMental.MentalVocabularyLookupId)]
        });
        this.mentalModal.show();
    }

    public hideMentalModal(): void {
        this.mentalModal.hide();
    }

    public saveMental(caseMental: CaseMental) {
        this.casesService.updateMental(this.caseBook).subscribe(
            data => {
                this.mentalModal.hide();

                let selectedMentalId = this.caseBook.SelectedMental.CaseMentalId;

                selectedMentalId == undefined ?
                    this.caseBook.vMental.push(data) :
                    this.caseBook.vMental[this.caseBook.vMental.findIndex(mental => mental.CaseMentalId == selectedMentalId)] = data

                this.toastr.success('Mental Status updated successfully');
            },
            (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            }
        );
    }
}