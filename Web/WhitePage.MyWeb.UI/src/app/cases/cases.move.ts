import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { SelectModule, IOption } from 'ng-select';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { CasesService } from '../services/cases.services';
import { CommonService } from '../services/common.services';
import {
    CaseBook, Case, CaseAddress, vCaseAddress, CaseChildren, vCaseChildren, vCaseOffender, CaseOffender, vCaseMental, CaseMental, CaseSessionLog, vCaseFeedback, CaseFeedback, CaseLegal
    } from '../models/case.entities';
import { BaseCaseController } from './basecase.controller';
import { CasesDetailedComponent } from './cases.detailed';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { IMyOptions } from 'mydatepicker';

import * as moment from 'moment';

@Component({
    templateUrl: 'cases.move.html',
    styleUrls: ['cases.move.scss'],
    providers: [CasesDetailedComponent]
})
export class CasesMoveComponent extends BaseCaseController implements OnInit {

    public caseBook: CaseBook;
    private selectedCaseId: number;

    public mainForm: FormGroup;
    public primaryForm: any;
    public manageForm: any;
    public familyHouseHold: any;
    public spouseForm: any;
    public physicalHealthForm: any;
    public caseAbuseForm: any;
    public casePrimaryForm: any;
    public caseLegalForm: any;

    public router: Router;
    public isMainDataLoaded: boolean = false;
    public isPrimaryDataLoaded: boolean = false;
    public isHouseHoldDataLoaded: boolean = false;
    public isSpouseDataLoaded: boolean = false;
    public isPhysicalHealthDataLoaded: boolean = false;
    public isAbuseDataLoaded: boolean = false;
    public isManageDataLoaded: boolean = false;
    public isMentalDataLoaded: boolean = false;
    public isFeedbackDataLoaded: boolean = false;
    public isLegalDataLoaded: boolean = false;
    public isCategory2: boolean = false;
    public isCategory3: boolean = false;
    public isCategory4: boolean = false;

    public caseStatusLookupOptionsList: Array<IOption> = [];

    constructor(public fb: FormBuilder,
        public casesService: CasesService,
        public commonService: CommonService,
        public routerObj: Router,
        public toastr: ToastsManager,
        public vRef: ViewContainerRef,
        public activatedRoute: ActivatedRoute,
        public casesDetailed : CasesDetailedComponent) {
        super(casesService, commonService);

        this.isPrimaryDataLoaded = false;

        this.router = routerObj;
        this.toastr.setRootViewContainerRef(vRef);
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.selectedCaseId = params['id'];
            this.casesService
                .GetCaseById(this.selectedCaseId)
                .subscribe(data => {
                    console.log(data);

                    this.caseBook = data;
                    console.log(this.caseBook);

                    this.primaryForm = this.caseBook.Case;
                    this.manageForm = this.caseBook.Manage;
                    this.familyHouseHold = this.caseBook.FamilyHouseHold;
                    this.spouseForm = this.caseBook.Spouse;
                    this.physicalHealthForm = this.caseBook.PhysicalHealth;
                    this.caseAbuseForm = this.caseBook.Abuse;
                    this.caseLegalForm = this.caseBook.Legal;

                    this.getCaseStatuses();
                    this.loadLookups();

                    this.loadMainForm();
                });
        });
    }

    private getCaseById() {
        var url = '/cases/redirect/' + this.selectedCaseId;
        this.router.navigate([url]);
    }

    private getCaseStatuses(): any {
        var localStatusesOptionList = new Array<IOption>();

        var previousCaseStatusId = this.caseBook.Case.CaseStausId;

        for (var i = 0; i < this.caseStatusesList.length; i++) {

            if (this.caseStatusesList[i].Level == previousCaseStatusId + 1) {
                localStatusesOptionList.push({ value: this.caseStatusesList[i].CaseStatusId.toString(), label: this.caseStatusesList[i].Title });
            }
        }
        this.caseStatusOptionList = localStatusesOptionList;
        this.caseBook.Case.CaseStausId = this.caseBook.Case.CaseStausId + 1;

        if (this.caseBook.Case.CaseStausId == 2) {
            this.isCategory2 = true;
        }
        else if (this.caseBook.Case.CaseStausId == 3) {
            this.isCategory3 = true;
        }
        else if (this.caseBook.Case.CaseStausId == 4) {
            this.isCategory4 = true;
        }
    }

    private loadLookups(): any {
        this.yesNoOptionsList = this.ParseLookups("YesNo");
        this.peacemakerAssistanceOptionsList = this.ParseMultiLookups("PeacemakerAssistance");
        this.emergencyRelationshipOptionsList = this.ParseLookups("RelationshipWithClient");
        this.occupationOptionsList = this.ParseLookups("Occupation");
        this.incomeLookupOptionsList = this.ParseLookups("Income");
        this.reasonForSeekingHelpLookupOptionsList = this.ParseMultiLookups("ReasonForSeekingHelp");
        this.whoIsAbusingYouLookupOptionsList = this.ParseMultiLookups("AbusingPerson");
        this.sufferingFromAbuseLookupIdLookupOptionsList = this.ParseLookups("YesNo");

        this.feelAboutAbuseLookupOptionsList = this.ParseMultiLookups("AbusingFeel");
        this.farentsFeelAboutAbuseLookupOptionsList = this.ParseMultiLookups("AbusingParentsFeel");
        this.lawFeelAboutAbuseLookupOptionsList = this.ParseMultiLookups("AbusingParentsFeel");

        this.signsOfPhysicalAbuseLookupOptionsList = this.ParseLookups("YesNo");

        this.typesOfPhyscialAbuseLookupOptionsList = this.ParseMultiLookups("TypesOfPhysicalAbuse");
        this.frequencyOfPhyscialAbuseLookupOptionsList = this.ParseLookups("FrequencyOfAbuse");

        this.typesOfEmotionalAbuseLookupOptionsList = this.ParseMultiLookups("TypesOfEmotionalAbuse");
        this.frequencyOfEmotionalAbuseLookupOptionsList = this.ParseLookups("FrequencyOfAbuse");

        this.typesOfSexualAbuseLookupOptionsList = this.ParseMultiLookups("TypesOfSexualAbuse");
        this.frequencyOfSexualAbuseLookupOptionsList = this.ParseLookups("FrequencyOfAbuse");

        this.typesOfEconomicAbuseLookupOptionsList = this.ParseMultiLookups("TypesOfEconomicalAbuse");
        this.frequencyOfEconomicAbuseLookupOptionsList = this.ParseLookups("FrequencyOfAbuse");

        this.reasonsForAbuseLookupOptionsList = this.ParseMultiLookups("ReasonForAbuse");
        this.sourceOfCaseLookupOptionList = this.ParseLookups("SourceOfCase");
        this.typesOfCounselingLookupOptionList = this.ParseMultiLookups("TypesOfCounselling");
    }

    private loadMainForm() {
        this.mainForm = this.fb.group({

            // Manage category 2

            CaseStatusId: [this.caseBook.Case.CaseStausId.toString(), Validators.required],
            CaseSubject: [this.caseBook.Manage.CaseSubject, Validators.required],
            CaseDescription: [this.caseBook.Manage.CaseDescription, Validators.required],
            ResolutionLog: [this.caseBook.Manage.ResolutionLog, Validators.required],

            //End of Manage category 2 

            //Household category 2 
            SoughtHelpYesNoLookupId: [this.caseBook.FamilyHouseHold.SoughtHelpYesNoLookupId == undefined ? null : this.caseBook.FamilyHouseHold.SoughtHelpYesNoLookupId.toString(), Validators.required],
            SoughtHelpDesc: [this.caseBook.FamilyHouseHold.SoughtHelpDesc],
            SoughtHelpOutPut: [this.caseBook.FamilyHouseHold.SoughtHelpOutPut],
            PeacemakerAssistanceLookupId: [this.caseBook.FamilyHouseHold.PeacemakerAssistanceLookupId == undefined ? null : this.caseBook.FamilyHouseHold.PeacemakerAssistanceLookupId.toString(), Validators.required],
            PeacemakerAssistanceDesc: [this.caseBook.FamilyHouseHold.PeacemakerAssistanceDesc],
            PeacemakerFollowupYesNoLookupId: [this.caseBook.FamilyHouseHold.PeacemakerFollowupYesNoLookupId == undefined ? null : this.caseBook.FamilyHouseHold.PeacemakerFollowupYesNoLookupId.toString(), Validators.required],
            ClientSignedRegistrationFormYesNoLookupId: [this.caseBook.FamilyHouseHold.ClientSignedRegistrationFormYesNoLookupId == undefined ? null : this.caseBook.FamilyHouseHold.ClientSignedRegistrationFormYesNoLookupId.toString(), Validators.required],

            //End of Household category 2

            //Spouse category 2
            PrimaryEmergencyContactName: [this.caseBook.Spouse.PrimaryEmergencyContactName, Validators.required],
            PrimaryEmergencyRelationshipToClientLookupId: [this.caseBook.Spouse.PrimaryEmergencyRelationshipToClientLookupId == undefined ? null : this.caseBook.Spouse.PrimaryEmergencyRelationshipToClientLookupId.toString(), Validators.required],
            PrimaryEmergencyContactPhoneNumber: [this.caseBook.Spouse.PrimaryEmergencyContactPhoneNumber, [Validators.required, Validators.minLength(10), this.casesDetailed.mobileValidator]],

            //End of Spouse category 2

            //Physical Health category 2
            SufferingFromAnyMajorIllnessLookupId: new FormControl(this.caseBook.PhysicalHealth.SufferingFromAnyMajorIllnessLookupId == undefined ? null : this.caseBook.PhysicalHealth.SufferingFromAnyMajorIllnessLookupId.toString(), Validators.required),
            SufferingFromAnyMajorIllnessDesc: new FormControl(this.caseBook.PhysicalHealth.SufferingFromAnyMajorIllnessDesc),
            DiagnosedPsychiatricIllnessLookupId: new FormControl(this.caseBook.PhysicalHealth.DiagnosedPsychiatricIllnessLookupId == undefined ? null : this.caseBook.PhysicalHealth.DiagnosedPsychiatricIllnessLookupId.toString(), Validators.required),
            DiagnosedPsychiatricIllnessDesc: new FormControl(this.caseBook.PhysicalHealth.DiagnosedPsychiatricIllnessDesc),

            //End of physical health category 2

            //Household category 4
            OccupationLookupId: [this.caseBook.FamilyHouseHold.OccupationLookupId == undefined ? null : this.caseBook.FamilyHouseHold.OccupationLookupId.toString(), Validators.required],
            OccupationDesc: new FormControl(this.caseBook.FamilyHouseHold.OccupationDesc),
            YearOfMarriage: [this.caseBook.FamilyHouseHold.YearOfMarriage, Validators.required],
            ClientAgeAtFirstChild: [this.caseBook.FamilyHouseHold.ClientAgeAtFirstChild, Validators.required],
            HouseHoldIncomeLookupId: [this.caseBook.FamilyHouseHold.HouseHoldIncomeLookupId == undefined ? null : this.caseBook.FamilyHouseHold.HouseHoldIncomeLookupId.toString(), Validators.required],

            //End of household category 4

            //Physical Health Category 4
            AnyMedicationLookupId: [this.caseBook.PhysicalHealth.AnyMedicationLookupId == undefined ? null : this.caseBook.PhysicalHealth.AnyMedicationLookupId.toString(), Validators.required],
            AnyMedicationDesc: [this.caseBook.PhysicalHealth.AnyMedicationDesc],
            AnySubstanceLookupId: [this.caseBook.PhysicalHealth.AnySubstanceLookupId == undefined ? null : this.caseBook.PhysicalHealth.AnySubstanceLookupId.toString(), Validators.required],
            AnySubstanceDesc: new FormControl(this.caseBook.PhysicalHealth.AnySubstanceDesc),
            CurrentlyPregnantLookup: [this.caseBook.PhysicalHealth.CurrentlyPregnantLookup == undefined ? null : this.caseBook.PhysicalHealth.CurrentlyPregnantLookup.toString(), Validators.required],
            CurrentlyPregnantDesc: new FormControl(this.caseBook.PhysicalHealth.CurrentlyPregnantDesc),
            ReasonForSeekingHelpLookupId: [this.caseBook.PhysicalHealth.ReasonForSeekingHelpLookupId == undefined ? null : this.caseBook.PhysicalHealth.ReasonForSeekingHelpLookupId.toString(), Validators.required],
            WhoIsAbusingYouLookupId: [this.caseBook.PhysicalHealth.WhoIsAbusingYouLookupId == undefined ? null : this.caseBook.PhysicalHealth.WhoIsAbusingYouLookupId.toString(), Validators.required],
            WhoIsAbusingYouDesc: [this.caseBook.PhysicalHealth.WhoIsAbusingYouDesc == undefined ? null : this.caseBook.PhysicalHealth.WhoIsAbusingYouDesc.toString()],
            ReasonForSeekingHelpDesc: new FormControl(this.caseBook.PhysicalHealth.ReasonForSeekingHelpDesc == undefined ? null : this.caseBook.PhysicalHealth.ReasonForSeekingHelpDesc.toString()),

            //End of physical health category 4 

            //Abuse Category 4
            SufferingFromAbuseLookupId: new FormControl(this.caseBook.Abuse.SufferingFromAbuseLookupId == undefined ? null : this.caseBook.Abuse.SufferingFromAbuseLookupId.toString()),
            SufferingFromAbuseDesc: new FormControl(this.caseBook.Abuse.SufferingFromAbuseDesc),

            FeelAboutAbuseLookupId: new FormControl(this.caseBook.Abuse.FeelAboutAbuseLookupId == undefined ? null : this.caseBook.Abuse.FeelAboutAbuseLookupId.toString()),
            ParentsFeelAboutAbuseLookupId: new FormControl(this.caseBook.Abuse.ParentsFeelAboutAbuseLookupId == undefined ? null : this.caseBook.Abuse.ParentsFeelAboutAbuseLookupId.toString()),
            LawFeelAboutAbuseLookupId: new FormControl(this.caseBook.Abuse.LawFeelAboutAbuseLookupId == undefined ? null : this.caseBook.Abuse.LawFeelAboutAbuseLookupId.toString()),
            SignsOfPhysicalAbuseLookupId: new FormControl(this.caseBook.Abuse.SignsOfPhysicalAbuseLookupId == undefined ? null : this.caseBook.Abuse.SignsOfPhysicalAbuseLookupId.toString()),
            SignsOfPhysicalAbuseDesc: new FormControl(this.caseBook.Abuse.SignsOfPhysicalAbuseDesc),

            TypesOfPhyscialAbuseLookupId: new FormControl(this.caseBook.Abuse.TypesOfPhyscialAbuseLookupId == undefined ? null : this.caseBook.Abuse.TypesOfPhyscialAbuseLookupId.toString()),
            FrequencyOfPhyscialAbuseLookupId: new FormControl(this.caseBook.Abuse.FrequencyOfPhyscialAbuseLookupId == undefined ? null : this.caseBook.Abuse.FrequencyOfPhyscialAbuseLookupId.toString()),
            NumberOfYearsOfPhyscialAbuse: new FormControl(this.caseBook.Abuse.NumberOfYearsOfPhyscialAbuse == undefined ? null : this.caseBook.Abuse.NumberOfYearsOfPhyscialAbuse.toString(), [Validators.maxLength(2), this.casesDetailed.validateNumber]),

            TypesOfEmotionalAbuseLookupId: new FormControl(this.caseBook.Abuse.TypesOfEmotionalAbuseLookupId == undefined ? null : this.caseBook.Abuse.TypesOfEmotionalAbuseLookupId.toString()),
            FrequencyOfEmotionalAbuseLookupId: new FormControl(this.caseBook.Abuse.FrequencyOfEmotionalAbuseLookupId == undefined ? null : this.caseBook.Abuse.FrequencyOfEmotionalAbuseLookupId.toString()),
            NumberOfYearsOfEmotionalAbuse: new FormControl(this.caseBook.Abuse.NumberOfYearsOfEmotionalAbuse == undefined ? null : this.caseBook.Abuse.NumberOfYearsOfEmotionalAbuse.toString(), [Validators.maxLength(2), this.casesDetailed.validateNumber]),

            TypesOfSexualAbuseLookupId: new FormControl(this.caseBook.Abuse.TypesOfSexualAbuseLookupId == undefined ? null : this.caseBook.Abuse.TypesOfSexualAbuseLookupId.toString()),
            FrequencyOfSexualAbuseLookupId: new FormControl(this.caseBook.Abuse.FrequencyOfSexualAbuseLookupId == undefined ? null : this.caseBook.Abuse.FrequencyOfSexualAbuseLookupId.toString()),
            NumberOfYearsOfSexualAbuse: new FormControl(this.caseBook.Abuse.NumberOfYearsOfSexualAbuse == undefined ? null : this.caseBook.Abuse.NumberOfYearsOfSexualAbuse.toString(), [Validators.maxLength(2), this.casesDetailed.validateNumber]),

            TypesOfEconomicAbuseLookupId: new FormControl(this.caseBook.Abuse.TypesOfEconomicAbuseLookupId == undefined ? null : this.caseBook.Abuse.TypesOfEconomicAbuseLookupId.toString()),
            FrequencyOfEconomicAbuseLookupId: new FormControl(this.caseBook.Abuse.FrequencyOfEconomicAbuseLookupId == undefined ? null : this.caseBook.Abuse.FrequencyOfEconomicAbuseLookupId.toString()),
            NumberOfYearsOfEconomicAbuse: new FormControl(this.caseBook.Abuse.NumberOfYearsOfEconomicAbuse == undefined ? null : this.caseBook.Abuse.NumberOfYearsOfEconomicAbuse.toString(), [Validators.maxLength(2), this.casesDetailed.validateNumber]),

            ReasonsForAbuseLookupId: new FormControl(this.caseBook.Abuse.ReasonsForAbuseLookupId == undefined ? null : this.caseBook.Abuse.ReasonsForAbuseLookupId.toString()),
            ReasonForAbuseDesc: new FormControl(this.caseBook.Abuse.ReasonForAbuseDesc),

            //End of Abuse category 4

            //Case Category 4
            SourceOfCaseLookupId: new FormControl(this.caseBook.Manage.SourceOfCaseLookupId == undefined ? null : this.caseBook.Manage.SourceOfCaseLookupId.toString()),
            SourceOfCaseDesc: new FormControl(this.caseBook.Manage.SourceOfCaseDesc),

            TypesOfCounselingLookupId: new FormControl(this.caseBook.Manage.TypesOfCounselingLookupId == undefined ? null : this.caseBook.Manage.TypesOfCounselingLookupId.toString()),
            TotalNoOfSessionsLookupId: new FormControl(this.caseBook.Manage.TotalNoOfSessionsLookupId == undefined ? null : this.caseBook.Manage.TotalNoOfSessionsLookupId.toString(), [Validators.maxLength(2), this.casesDetailed.validateNumber]),
            TotalHoursSpentLookupId: new FormControl(this.caseBook.Manage.TotalHoursSpentLookupId == undefined ? null : this.caseBook.Manage.TotalHoursSpentLookupId.toString(), [Validators.maxLength(2), this.casesDetailed.validateNumber])

            //End of Case category 4
    })
        this.isMainDataLoaded = true;
    }

    public updateCase() {

        //Case category 2
        this.caseBook.Case.CaseStausId = this.mainForm.controls['CaseStatusId'].value;
        this.caseBook.Manage.CaseStatusId = this.mainForm.controls['CaseStatusId'].value;
        this.caseBook.Manage.CaseSubject = this.mainForm.controls['CaseSubject'].value;
        this.caseBook.Manage.CaseDescription = this.mainForm.controls['CaseDescription'].value;
        this.caseBook.Manage.ResolutionLog = this.mainForm.controls['ResolutionLog'].value;
        //End of Case Category 2

        //Household category 2
        this.caseBook.FamilyHouseHold.SoughtHelpYesNoLookupId = this.mainForm.controls['SoughtHelpYesNoLookupId'].value;
        this.caseBook.FamilyHouseHold.SoughtHelpDesc = this.mainForm.controls['SoughtHelpDesc'].value;
        this.caseBook.FamilyHouseHold.SoughtHelpOutPut = this.mainForm.controls['SoughtHelpOutPut'].value;
        //this.caseBook.FamilyHouseHold.PeacemakerAssistanceLookupId = this.mainForm.controls['PeacemakerAssistanceLookupId'].value;
        this.caseBook.FamilyHouseHold.PeacemakerAssistanceDesc = this.mainForm.controls['PeacemakerAssistanceDesc'].value;
        this.caseBook.FamilyHouseHold.PeacemakerFollowupYesNoLookupId = this.mainForm.controls['PeacemakerFollowupYesNoLookupId'].value;
        this.caseBook.FamilyHouseHold.ClientSignedRegistrationFormYesNoLookupId = this.mainForm.controls['ClientSignedRegistrationFormYesNoLookupId'].value;

        //End of Household category 2

        //Spouse category 2
        this.caseBook.Spouse.PrimaryEmergencyContactName = this.mainForm.controls['PrimaryEmergencyContactName'].value;
        this.caseBook.Spouse.PrimaryEmergencyRelationshipToClientLookupId = this.mainForm.controls['PrimaryEmergencyRelationshipToClientLookupId'].value;
        this.caseBook.Spouse.PrimaryEmergencyContactPhoneNumber = this.mainForm.controls['PrimaryEmergencyContactPhoneNumber'].value;

        //End of Spouse category 2

        //PhysicalHealth category 2
        this.caseBook.PhysicalHealth.SufferingFromAnyMajorIllnessLookupId = this.mainForm.controls['SufferingFromAnyMajorIllnessLookupId'].value;
        this.caseBook.PhysicalHealth.SufferingFromAnyMajorIllnessDesc = this.mainForm.controls['SufferingFromAnyMajorIllnessDesc'].value;
        this.caseBook.PhysicalHealth.DiagnosedPsychiatricIllnessLookupId = this.mainForm.controls['DiagnosedPsychiatricIllnessLookupId'].value;
        this.caseBook.PhysicalHealth.DiagnosedPsychiatricIllnessDesc = this.mainForm.controls['DiagnosedPsychiatricIllnessDesc'].value;
        //End of PhysicalHealth category 2

        //Household category 4

        this.caseBook.FamilyHouseHold.OccupationLookupId = this.mainForm.controls['OccupationLookupId'].value;
        this.caseBook.FamilyHouseHold.OccupationDesc = this.mainForm.controls['OccupationDesc'].value;
        this.caseBook.FamilyHouseHold.YearOfMarriage = this.mainForm.controls['YearOfMarriage'].value;
        this.caseBook.FamilyHouseHold.ClientAgeAtFirstChild = this.mainForm.controls['ClientAgeAtFirstChild'].value;
        this.caseBook.FamilyHouseHold.HouseHoldIncomeLookupId = this.mainForm.controls['HouseHoldIncomeLookupId'].value;

        //End of Household category 4

        //PhysicalHealth category 4
        this.caseBook.PhysicalHealth.AnyMedicationLookupId = this.mainForm.controls['AnyMedicationLookupId'].value;
        this.caseBook.PhysicalHealth.AnyMedicationDesc = this.mainForm.controls['AnyMedicationDesc'].value;
        this.caseBook.PhysicalHealth.AnySubstanceLookupId = this.mainForm.controls['AnySubstanceLookupId'].value;
        this.caseBook.PhysicalHealth.AnySubstanceDesc = this.mainForm.controls['AnySubstanceDesc'].value;
        this.caseBook.PhysicalHealth.CurrentlyPregnantLookup = this.mainForm.controls['CurrentlyPregnantLookup'].value;
        this.caseBook.PhysicalHealth.CurrentlyPregnantDesc = this.mainForm.controls['CurrentlyPregnantDesc'].value;
        //this.caseBook.PhysicalHealth.ReasonForSeekingHelpLookupId = this.mainForm.controls['ReasonForSeekingHelpLookupId'].value;
        this.caseBook.PhysicalHealth.ReasonForSeekingHelpDesc = this.mainForm.controls['ReasonForSeekingHelpDesc'].value;
        //this.caseBook.PhysicalHealth.WhoIsAbusingYouLookupId = this.mainForm.controls['WhoIsAbusingYouLookupId'].value;
        this.caseBook.PhysicalHealth.WhoIsAbusingYouDesc = this.mainForm.controls['WhoIsAbusingYouDesc'].value;
        //End of PhysicalHealth category 4

        //Abuse category 4

        this.caseBook.Abuse.SufferingFromAbuseLookupId = this.mainForm.controls['SufferingFromAbuseLookupId'].value;
        this.caseBook.Abuse.SufferingFromAbuseDesc = this.mainForm.controls['SufferingFromAbuseDesc'].value;
        //this.caseBook.Abuse.FeelAboutAbuseLookupId = this.mainForm.controls['FeelAboutAbuseLookupId'].value;
        //this.caseBook.Abuse.ParentsFeelAboutAbuseLookupId = this.mainForm.controls['ParentsFeelAboutAbuseLookupId'].value;
        //this.caseBook.Abuse.LawFeelAboutAbuseLookupId = this.mainForm.controls['LawFeelAboutAbuseLookupId'].value;
        this.caseBook.Abuse.SignsOfPhysicalAbuseLookupId = this.mainForm.controls['SignsOfPhysicalAbuseLookupId'].value;
        this.caseBook.Abuse.SignsOfPhysicalAbuseDesc = this.mainForm.controls['SignsOfPhysicalAbuseDesc'].value;
        //this.caseBook.Abuse.TypesOfPhyscialAbuseLookupId = this.mainForm.controls['TypesOfPhyscialAbuseLookupId'].value;
        this.caseBook.Abuse.FrequencyOfPhyscialAbuseLookupId = this.mainForm.controls['FrequencyOfPhyscialAbuseLookupId'].value;
        this.caseBook.Abuse.NumberOfYearsOfPhyscialAbuse = this.mainForm.controls['NumberOfYearsOfPhyscialAbuse'].value;
        //this.caseBook.Abuse.TypesOfEconomicAbuseLookupId = this.mainForm.controls['TypesOfEconomicAbuseLookupId'].value;
        this.caseBook.Abuse.FrequencyOfEconomicAbuseLookupId = this.mainForm.controls['FrequencyOfEconomicAbuseLookupId'].value;
        this.caseBook.Abuse.NumberOfYearsOfEconomicAbuse = this.mainForm.controls['NumberOfYearsOfEconomicAbuse'].value;
        //this.caseBook.Abuse.TypesOfSexualAbuseLookupId = this.mainForm.controls['TypesOfSexualAbuseLookupId'].value;
        this.caseBook.Abuse.FrequencyOfSexualAbuseLookupId = this.mainForm.controls['FrequencyOfSexualAbuseLookupId'].value;
        this.caseBook.Abuse.NumberOfYearsOfSexualAbuse = this.mainForm.controls['NumberOfYearsOfSexualAbuse'].value;
        //this.caseBook.Abuse.TypesOfEmotionalAbuseLookupId = this.mainForm.controls['TypesOfEmotionalAbuseLookupId'].value;
        this.caseBook.Abuse.FrequencyOfEmotionalAbuseLookupId = this.mainForm.controls['FrequencyOfEmotionalAbuseLookupId'].value;
        this.caseBook.Abuse.NumberOfYearsOfEmotionalAbuse = this.mainForm.controls['NumberOfYearsOfEmotionalAbuse'].value;
        //this.caseBook.Abuse.ReasonsForAbuseLookupId = this.mainForm.controls['ReasonsForAbuseLookupId'].value;
        this.caseBook.Abuse.ReasonForAbuseDesc = this.mainForm.controls['ReasonForAbuseDesc'].value;

        //End of Abuse category 4

        //Case category 4
        this.caseBook.Manage.SourceOfCaseLookupId = this.mainForm.controls['SourceOfCaseLookupId'].value;
        this.caseBook.Manage.SourceOfCaseDesc = this.mainForm.controls['SourceOfCaseDesc'].value;
        //this.caseBook.Manage.TypesOfCounselingLookupId = this.mainForm.controls['TypesOfCounselingLookupId'].value;
        this.caseBook.Manage.TotalNoOfSessionsLookupId = this.mainForm.controls['TotalNoOfSessionsLookupId'].value;
        this.caseBook.Manage.TotalHoursSpentLookupId = this.mainForm.controls['TotalHoursSpentLookupId'].value;

        //End of Case category 4

        this.casesService
            .updateCaseStatus(this.caseBook).subscribe(data => {
                this.getCaseById();
                this.toastr.success('Case moved successfully');
            }, (error: any) => {
                this.toastr.error("Error while moving case, " + error);
            });

    }

    public caseStatusOptionList: Array<IOption> = [];
    public yesNoOptionsList: Array<IOption>;
    public peacemakerAssistanceOptionsList: Array<IMultiSelectOption> = [];
    public emergencyRelationshipOptionsList: Array<IOption> = [];
    public occupationOptionsList: Array<IOption> = [];
    public incomeLookupOptionsList: Array<IOption> = [];
    public reasonForSeekingHelpLookupOptionsList: Array<IMultiSelectOption> = [];
    public whoIsAbusingYouLookupOptionsList: Array<IMultiSelectOption> = [];
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
    public sourceOfCaseLookupOptionList: Array<IOption> = [];
    public typesOfCounselingLookupOptionList: Array<IMultiSelectOption> = [];
}