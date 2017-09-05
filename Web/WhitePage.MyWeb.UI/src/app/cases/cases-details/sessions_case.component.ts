import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { CaseBook, Case, CaseAddress, vCaseAddress, CaseFeedback, CaseSessionLog } from '../../models/case.entities';

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
    selector: 'sessionsCase',
    templateUrl: 'sessions_case.component.html',
    inputs: ['caseBook'],
})

export class SessionsCaseComponent implements OnInit {
    public caseBook: CaseBook;
    public caseSessionForm: FormGroup;
    public isCaseBookDataLoaded: boolean = false;

    constructor(public fb: FormBuilder,
        public validationService: ValidationService,
        public casesService: CasesService,
        public toastr: ToastsManager) {
    }

    ngOnInit() {
        this.isCaseBookDataLoaded = true;
    }

    /* Start - Sessions */

    @ViewChild('sessionsModal') public sessionsModal: ModalDirective;

    public RespectedDuringYourVisitLookupOptionList: Array<IOption> = [];
    public FeelSafeAndSecureLookupOptionList: Array<IOption> = [];
    public FeelThatCounsellingLookupOptionList: Array<IOption> = [];
    public AssistanceOfPeacemakerLookupOptionList: Array<IOption> = [];
    public RecommendFreeCounsellingLookupOptionList: Array<IOption> = [];
    public AbleToImproveLookupOptionList: Array<IOption> = [];
    public OPMTeamToFollowupLookupOptionList: Array<IOption> = [];

    public addNewSession() {
        this.caseBook.SelectedSessionLog = new CaseSessionLog();
        this.caseBook.SelectedSessionLog.CaseId = this.caseBook.Case.CaseId;

        this.caseSessionForm = this.fb.group({
            CounselingDate: ['', Validators.required],
            TypeOfCounselingLookupId: ['', Validators.required],
            DurationOfSessionMIn: ['', Validators.required],
            NextSessionScheduled: [''],
            SessionNotes: ['', Validators.required]
        });

        this.sessionsModal.show();
    }

    public editSession(sessionLog: CaseSessionLog) {
        this.caseBook.SelectedSessionLog = new CaseSessionLog();
        this.caseBook.SelectedSessionLog.CaseSessionLogId = sessionLog.CaseSessionLogId;
        this.caseBook.SelectedSessionLog.CaseId = sessionLog.CaseId;

        this.caseBook.SelectedSessionLog.CounselingDate = sessionLog.CounselingDate;
        this.caseBook.SelectedSessionLog.TypeOfCounselingLookupId = sessionLog.TypeOfCounselingLookupId;
        this.caseBook.SelectedSessionLog.DurationOfSessionMIn = sessionLog.DurationOfSessionMIn;
        this.caseBook.SelectedSessionLog.NextSessionScheduled = sessionLog.NextSessionScheduled;
        this.caseBook.SelectedSessionLog.SessionNotes = sessionLog.SessionNotes;

        this.caseSessionForm = this.fb.group({
            CounselingDate: new FormControl(this.caseBook.SelectedSessionLog.CounselingDate, Validators.required),
            TypeOfCounselingLookupId: new FormControl(this.caseBook.SelectedSessionLog.TypeOfCounselingLookupId == undefined ? null : this.caseBook.SelectedSessionLog.TypeOfCounselingLookupId.toString(), Validators.required),
            DurationOfSessionMIn: new FormControl(this.caseBook.SelectedSessionLog.DurationOfSessionMIn, Validators.required),
            NextSessionScheduled: new FormControl(this.caseBook.SelectedSessionLog.NextSessionScheduled),
            SessionNotes: new FormControl(this.caseBook.SelectedSessionLog.SessionNotes, Validators.required)
        });

        this.caseSessionForm.patchValue({ CounselingDate: { date: sessionLog.CounselingDate } });

        this.caseSessionForm.patchValue({ NextSessionScheduled: { date: sessionLog.NextSessionScheduled } });

        this.sessionsModal.show();
    }

    public hideSessionModal(): void {
        this.sessionsModal.hide();
    }

    public saveInProgress = false;

    private returnDate(object: any): any {
        var formatted = object['formatted'];
        if (formatted != undefined) {
            return moment.utc(formatted).format();
        }

        return moment.utc(object['date']).format();
    }

    public saveSession(sessionLog: CaseSessionLog) {

        let counsDateObj = this.caseSessionForm.controls['CounselingDate'].value;

        this.caseBook.SelectedSessionLog.CounselingDate = this.returnDate(counsDateObj);
        this.caseBook.SelectedSessionLog.TypeOfCounselingLookupId = this.caseSessionForm.controls['TypeOfCounselingLookupId'].value;
        this.caseBook.SelectedSessionLog.DurationOfSessionMIn = this.caseSessionForm.controls['DurationOfSessionMIn'].value;

        let nextSchObject = this.caseSessionForm.controls['NextSessionScheduled'].value;

        if (nextSchObject == null || nextSchObject == "") {
            this.caseBook.SelectedSessionLog.NextSessionScheduled = null;
        }
        else {
            this.caseBook.SelectedSessionLog.NextSessionScheduled = this.returnDate(nextSchObject);
        }

        this.caseBook.SelectedSessionLog.SessionNotes = this.caseSessionForm.controls['SessionNotes'].value;

        this.saveInProgress = true;
        this.sessionsModal.config.keyboard = false;

        this.casesService
            .updateSessionLog(this.caseBook).subscribe(data => {
                this.sessionsModal.hide();
                this.saveInProgress = false;
                let selectedId = this.caseBook.SelectedSessionLog.CaseSessionLogId;
                if (selectedId == undefined) {
                    this.caseBook.vSessionLog.push(data);
                    // this.caseBook.SelectedSessionLog.CaseSessionLogId = data.CaseSessionLogId
                }
                else {
                    let k = this.caseBook.vSessionLog.findIndex(sLog => sLog.CaseSessionLogId == this.caseBook.SelectedSessionLog.CaseSessionLogId);
                    this.caseBook.vSessionLog[k] = data;
                    //  this.caseBook.vSessionLog[0].
                }

                this.toastr.success('Session updated successfully');
            }, (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }
    /* End of - Sessions */
}