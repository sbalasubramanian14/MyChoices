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
    selector: 'feedbackCase',
    templateUrl: 'feedback_case.component.html',
    inputs: ['caseBook'],
})

export class FeedbackCaseComponent implements OnInit {
    public caseBook: CaseBook;
    public caseFeedbackForm: FormGroup;
    public isFeedbackDataLoaded: boolean = false;

    constructor(public fb: FormBuilder,
        public validationService: ValidationService,
        public casesService: CasesService,
        public toastr: ToastsManager) {
    }

    ngOnInit() {
        this.isFeedbackDataLoaded = true;
    }

    /* Start - Feedback */

    @ViewChild('feedbackModal') public feedbackModal: ModalDirective;

    public addNewFeedback() {
        this.caseBook.SelectedFeedback = new CaseFeedback();
        this.caseBook.SelectedFeedback.CaseId = this.caseBook.Case.CaseId;

        this.caseFeedbackForm = this.fb.group({
            RespectedDuringYourVisitLookupId: new FormControl(this.caseBook.SelectedFeedback.RespectedDuringYourVisitLookupId == undefined ? null : this.caseBook.SelectedFeedback.RespectedDuringYourVisitLookupId.toString(), Validators.required),
            FeelSafeAndSecureLookupId: new FormControl(this.caseBook.SelectedFeedback.FeelSafeAndSecureLookupId == undefined ? null : this.caseBook.SelectedFeedback.FeelSafeAndSecureLookupId.toString(), Validators.required),
            FeelThatCounsellingLookupId: new FormControl(this.caseBook.SelectedFeedback.FeelThatCounsellingLookupId == undefined ? null : this.caseBook.SelectedFeedback.FeelThatCounsellingLookupId.toString(), Validators.required),
            AssistanceOfPeacemakerLookupId: new FormControl(this.caseBook.SelectedFeedback.AssistanceOfPeacemakerLookupId == undefined ? null : this.caseBook.SelectedFeedback.AssistanceOfPeacemakerLookupId.toString(), Validators.required),

            RecommendFreeCounsellingLookupId: new FormControl(this.caseBook.SelectedFeedback.RecommendFreeCounsellingLookupId == undefined ? null : this.caseBook.SelectedFeedback.RecommendFreeCounsellingLookupId.toString(), Validators.required),
            AbleToImproveLookupId: new FormControl(this.caseBook.SelectedFeedback.AbleToImproveLookupId == undefined ? null : this.caseBook.SelectedFeedback.AbleToImproveLookupId.toString(), Validators.required),
            OPMTeamToFollowupLookupId: new FormControl(this.caseBook.SelectedFeedback.OPMTeamToFollowupLookupId == undefined ? null : this.caseBook.SelectedFeedback.OPMTeamToFollowupLookupId.toString(), Validators.required),

            AnySuggestions: new FormControl(this.caseBook.SelectedFeedback.AnySuggestions)
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
            RespectedDuringYourVisitLookupId: new FormControl(this.caseBook.SelectedFeedback.RespectedDuringYourVisitLookupId == undefined ? null : this.caseBook.SelectedFeedback.RespectedDuringYourVisitLookupId.toString(), Validators.required),
            FeelSafeAndSecureLookupId: new FormControl(this.caseBook.SelectedFeedback.FeelSafeAndSecureLookupId == undefined ? null : this.caseBook.SelectedFeedback.FeelSafeAndSecureLookupId.toString(), Validators.required),
            FeelThatCounsellingLookupId: new FormControl(this.caseBook.SelectedFeedback.FeelThatCounsellingLookupId == undefined ? null : this.caseBook.SelectedFeedback.FeelThatCounsellingLookupId.toString(), Validators.required),
            AssistanceOfPeacemakerLookupId: new FormControl(this.caseBook.SelectedFeedback.AssistanceOfPeacemakerLookupId == undefined ? null : this.caseBook.SelectedFeedback.AssistanceOfPeacemakerLookupId.toString(), Validators.required),

            RecommendFreeCounsellingLookupId: new FormControl(this.caseBook.SelectedFeedback.RecommendFreeCounsellingLookupId == undefined ? null : this.caseBook.SelectedFeedback.RecommendFreeCounsellingLookupId.toString(), Validators.required),
            AbleToImproveLookupId: new FormControl(this.caseBook.SelectedFeedback.AbleToImproveLookupId == undefined ? null : this.caseBook.SelectedFeedback.AbleToImproveLookupId.toString(), Validators.required),
            OPMTeamToFollowupLookupId: new FormControl(this.caseBook.SelectedFeedback.OPMTeamToFollowupLookupId == undefined ? null : this.caseBook.SelectedFeedback.OPMTeamToFollowupLookupId.toString(), Validators.required),

            AnySuggestions: new FormControl(this.caseBook.SelectedFeedback.AnySuggestions)
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

        this.casesService
            .updateFeedback(this.caseBook).subscribe(data => {
                this.feedbackModal.hide();
                this.caseBook.FeedBack.push(data);
                this.toastr.success('Feedback updated successfully');

            }, (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }
    /* End of - Feedback */
}