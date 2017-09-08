import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModule, IOption } from 'ng-select';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { ValidationService } from '../../services/validation.service';
import { CasesService } from '../../services/cases.services';

import { BaseCaseController } from './../basecase.controller';

import { CaseBook, Case, CaseFeedback } from '../../models/case.entities';

@Component({
    selector: 'feedbackCase',
    templateUrl: 'feedback_case.component.html',
    styleUrls: ['../cases.detailed.scss'],
    inputs: ['caseBook'],
})

export class FeedbackCaseComponent implements OnInit {
    public caseBook: CaseBook;
    public caseFeedbackForm: FormGroup;
    public isCaseBookDataLoaded: boolean = false;
    public RespectedDuringYourVisitLookupOptionList: Array<IOption> = [];
    public FeelSafeAndSecureLookupOptionList: Array<IOption> = [];
    public FeelThatCounsellingLookupOptionList: Array<IOption> = [];
    public AssistanceOfPeacemakerLookupOptionList: Array<IOption> = [];
    public RecommendFreeCounsellingLookupOptionList: Array<IOption> = [];
    public AbleToImproveLookupOptionList: Array<IOption> = [];
    public OPMTeamToFollowupLookupOptionList: Array<IOption> = [];

    constructor(
        public fb: FormBuilder,
        private validationService: ValidationService,
        private casesService: CasesService,
        public toastr: ToastsManager) {

        this.RespectedDuringYourVisitLookupOptionList = BaseCaseController.staticParseLookups("RespectedDuringYourVisit");
        this.FeelSafeAndSecureLookupOptionList = BaseCaseController.staticParseLookups("YesNo");
        this.FeelThatCounsellingLookupOptionList = BaseCaseController.staticParseLookups("FeelThatCounselling");
        this.AssistanceOfPeacemakerLookupOptionList = BaseCaseController.staticParseLookups("AssistanceOfPeacemaker");
        this.RecommendFreeCounsellingLookupOptionList = BaseCaseController.staticParseLookups("RecommendFreeCounselling");
        this.AbleToImproveLookupOptionList = BaseCaseController.staticParseLookups("AbleToImprove");
        this.OPMTeamToFollowupLookupOptionList = BaseCaseController.staticParseLookups("YesNo");
    }

    ngOnInit() {
        this.isCaseBookDataLoaded = true;
    }
    
    @ViewChild('feedbackModal') public feedbackModal: ModalDirective;

    private returnValue(input: any) {
        return input == undefined ? null : input.toString()
    }

    public addNewFeedback() {
        this.caseBook.SelectedFeedback = new CaseFeedback();
        this.caseBook.SelectedFeedback.CaseId = this.caseBook.Case.CaseId;

        this.caseFeedbackForm = this.fb.group({
            RespectedDuringYourVisitLookupId:  [this.returnValue(this.caseBook.SelectedFeedback.RespectedDuringYourVisitLookupId), Validators.required],
            FeelSafeAndSecureLookupId: [this.returnValue(this.caseBook.SelectedFeedback.FeelSafeAndSecureLookupId), Validators.required],
            FeelThatCounsellingLookupId: [this.returnValue(this.caseBook.SelectedFeedback.FeelThatCounsellingLookupId), Validators.required],
            AssistanceOfPeacemakerLookupId: [this.returnValue(this.caseBook.SelectedFeedback.AssistanceOfPeacemakerLookupId), Validators.required],

            RecommendFreeCounsellingLookupId: [this.returnValue(this.caseBook.SelectedFeedback.RecommendFreeCounsellingLookupId), Validators.required],
            AbleToImproveLookupId: [this.returnValue(this.caseBook.SelectedFeedback.AbleToImproveLookupId), Validators.required],
            OPMTeamToFollowupLookupId: [this.returnValue(this.caseBook.SelectedFeedback.OPMTeamToFollowupLookupId), Validators.required],

            AnySuggestions: [this.caseBook.SelectedFeedback.AnySuggestions]
        });
        this.feedbackModal.show();
    }

    public editFeedback(feedback: CaseFeedback) {
        this.caseBook.SelectedFeedback = new CaseFeedback();
        this.caseBook.SelectedFeedback.CaseId = this.caseBook.Case.CaseId;
        this.caseBook.SelectedFeedback.CaseFeedbackId = feedback.CaseFeedbackId;

        this.caseBook.SelectedFeedback.RespectedDuringYourVisitLookupId = feedback.RespectedDuringYourVisitLookupId;
        this.caseBook.SelectedFeedback.FeelSafeAndSecureLookupId = feedback.FeelSafeAndSecureLookupId;
        this.caseBook.SelectedFeedback.FeelThatCounsellingLookupId = feedback.FeelThatCounsellingLookupId;
        this.caseBook.SelectedFeedback.AssistanceOfPeacemakerLookupId = feedback.AssistanceOfPeacemakerLookupId;

        this.caseBook.SelectedFeedback.RecommendFreeCounsellingLookupId = feedback.RecommendFreeCounsellingLookupId;
        this.caseBook.SelectedFeedback.AbleToImproveLookupId = feedback.AbleToImproveLookupId;
        this.caseBook.SelectedFeedback.OPMTeamToFollowupLookupId = feedback.OPMTeamToFollowupLookupId;

        this.caseBook.SelectedFeedback.AnySuggestions = feedback.AnySuggestions;

        this.caseFeedbackForm = this.fb.group({
            RespectedDuringYourVisitLookupId: [this.returnValue(this.caseBook.SelectedFeedback.RespectedDuringYourVisitLookupId), Validators.required],
            FeelSafeAndSecureLookupId: [this.returnValue(this.caseBook.SelectedFeedback.FeelSafeAndSecureLookupId), Validators.required],
            FeelThatCounsellingLookupId: [this.returnValue(this.caseBook.SelectedFeedback.FeelThatCounsellingLookupId), Validators.required],
            AssistanceOfPeacemakerLookupId: [this.returnValue(this.caseBook.SelectedFeedback.AssistanceOfPeacemakerLookupId), Validators.required],

            RecommendFreeCounsellingLookupId: [this.returnValue(this.caseBook.SelectedFeedback.RecommendFreeCounsellingLookupId), Validators.required],
            AbleToImproveLookupId: [this.returnValue(this.caseBook.SelectedFeedback.AbleToImproveLookupId), Validators.required],
            OPMTeamToFollowupLookupId: [this.returnValue(this.caseBook.SelectedFeedback.OPMTeamToFollowupLookupId), Validators.required],

            AnySuggestions: [this.caseBook.SelectedFeedback.AnySuggestions]
        });
        this.feedbackModal.show();
    }

    public hideFeedbackModal(): void {
        this.feedbackModal.hide();
    }

    public saveFeedback(feedback: CaseFeedback) {
        this.caseBook.SelectedFeedback.CaseId = this.caseBook.Case.CaseId;

        this.caseBook.SelectedFeedback.RespectedDuringYourVisitLookupId = this.caseFeedbackForm.controls['RespectedDuringYourVisitLookupId'].value;
        this.caseBook.SelectedFeedback.FeelSafeAndSecureLookupId = this.caseFeedbackForm.controls['FeelSafeAndSecureLookupId'].value;
        this.caseBook.SelectedFeedback.FeelThatCounsellingLookupId = this.caseFeedbackForm.controls['FeelThatCounsellingLookupId'].value;
        this.caseBook.SelectedFeedback.AssistanceOfPeacemakerLookupId = this.caseFeedbackForm.controls['AssistanceOfPeacemakerLookupId'].value;

        this.caseBook.SelectedFeedback.RecommendFreeCounsellingLookupId = this.caseFeedbackForm.controls['RecommendFreeCounsellingLookupId'].value;
        this.caseBook.SelectedFeedback.AbleToImproveLookupId = this.caseFeedbackForm.controls['AbleToImproveLookupId'].value;
        this.caseBook.SelectedFeedback.OPMTeamToFollowupLookupId = this.caseFeedbackForm.controls['OPMTeamToFollowupLookupId'].value;

        this.caseBook.SelectedFeedback.AnySuggestions = this.caseFeedbackForm.controls['AnySuggestions'].value;

        this.casesService.updateFeedback(this.caseBook).subscribe(
            data => {
                this.feedbackModal.hide();

                let selectedFeedbackId = this.caseBook.SelectedFeedback.CaseFeedbackId;

                selectedFeedbackId == undefined ?
                    this.caseBook.FeedBack.push(data) :
                    this.caseBook.FeedBack[this.caseBook.FeedBack.findIndex(feedBack => feedBack.CaseFeedbackId == selectedFeedbackId)] = data

                this.toastr.success('Feedback updated successfully');
            },
            (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            }
        );
    }
}