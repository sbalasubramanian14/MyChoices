import { Component, Input } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { CaseBook } from '../../models/case.entities';
import { BaseCaseController } from './../basecase.controller';

@Component({
    selector: 'mental',
    templateUrl: 'mental.component.html',
    inputs: ['caseBook'],
    styleUrls: ['../cases.view.scss'],

})
export class MentalComponent {

    public caseBook: CaseBook;

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

    constructor() {

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
}