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
import { CaseBook } from '../models/case.entities';
import { BaseCaseController } from './basecase.controller';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { IMyOptions } from 'mydatepicker';

import * as moment from 'moment';

import { MatchesPipe } from './../pipes/Matches.Pipe';

@Component({
    templateUrl: 'cases.view.html',
    styleUrls: ['cases.view.scss']
})
export class CasesViewComponent extends BaseCaseController implements OnInit {
    public caseBook: CaseBook;
    private selectedCaseId: number;

    public primaryForm: any;
    public manageForm: any;
    public familyHouseHold: any;
    public spouseForm: any;
    public physicalHealthForm: any;
    public caseAbuseForm: any;
    public casePrimaryForm: any;
    public caseLegalForm: any;

    public router: Router;
    public isPrimaryDataLoaded: boolean = false;
    public isHouseHoldDataLoaded: boolean = false;
    public isSpouseDataLoaded: boolean = false;
    public isPhysicalHealthDataLoaded: boolean = false;
    public isAbuseDataLoaded: boolean = false;
    public isManageDataLoaded: boolean = false;
    public isMentalDataLoaded: boolean = false;
    public isFeedbackDataLoaded: boolean = false;
    public isLegalDataLoaded: boolean = false;

    public childrenDeceasedLookupOptionsList: Array<IMultiSelectOption> = [];
    public incomeLookupOptionsList: Array<IOption> = [];
    public yesNoOptionsList: Array<IOption> = [];

    public peacemakerAssistanceOptionsList: Array<IMultiSelectOption> = [];
    public religionOptionsList: Array<IOption> = [];
    public levelOfEducationOptionsList: Array<IOption> = [];
    public vocationalSkillsOptionsList: Array<IOption> = [];
    public occupationOptionsList: Array<IOption> = [];
    public householdMembersOptionsList: Array<IMultiSelectOption> = [];

    public spouseEducationLookupIdLookupOptionsList: Array<IOption> = [];
    public spouseStateOptionsList: Array<IOption> = [];
    public spouseCityOptionsList: Array<IOption> = [];
    public emergencyRelationshipOptionsList: Array<IOption> = [];

    public sleepPerNightLookupOptionsList: Array<IOption> = [];
    public appetiteLookupOptionsList: Array<IOption> = [];
    public exerciseLookupOptionsList: Array<IOption> = [];
    public reasonForSeekingHelpLookupOptionsList: Array<IMultiSelectOption> = [];
    public whoIsAbusingYouLookupOptionsList: Array<IMultiSelectOption> = [];

    constructor(public casesService: CasesService,
        public commonService: CommonService,
        public routerObj: Router,
        public toastr: ToastsManager,
        public vRef: ViewContainerRef,
        public activatedRoute: ActivatedRoute) {
        super(casesService, commonService);

        this.isPrimaryDataLoaded = false;

        this.router = routerObj;
        this.toastr.setRootViewContainerRef(vRef);

        this.observerDataSubject.subscribe(data => {
            switch (data) {
                case "CaseStatuses":
                    var localStatusesOptionList = new Array<IOption>();
                    for (var i = 0; i < this.caseStatusesList.length; i++) {
                        localStatusesOptionList.push({
                            value: this.caseStatusesList[i].CaseStatusId.toString(),
                            label: this.caseStatusesList[i].Title
                        });
                    }
                    this.caseStatusOptionList = localStatusesOptionList;
                    break;
                case "Centers":
                    var localCenterOptionList = new Array<IOption>();
                    for (var i = 0; i < this.centersList.length; i++) {
                        localCenterOptionList.push({
                            value: this.centersList[i].CenterId.toString(),
                            label: this.centersList[i].Title
                        });
                    }
                    this.centerOptionList = localCenterOptionList;

                    if (this.centersList.length > 0 && this.centerOptionList.length > 0 && this.counselorOptionsList.length > 0) {
                        this.isPrimaryDataLoaded = true;
                    }
                    break;
                case "States":
                    var localStatesOptionList = new Array<IOption>();
                    for (var i = 0; i < this.statesList.length; i++) {
                        localStatesOptionList.push({
                            value: this.statesList[i].StateId.toString(),
                            label: this.statesList[i].Title
                        });
                    }
                    this.stateOptionsList = localStatesOptionList;

                    this.spouseStateOptionsList = localStatesOptionList;
                    break;
                case "Lookups":

                    this.genderLookupOptionsList = this.ParseLookups("Gender");
                    this.maritalStatusLookupOptionsList = this.ParseLookups("MaritalStatus");
                    this.requireAssistanceLookupOptionsList = this.ParseLookups("RequiredAssistance");
                    this.relationshipWithAbuserLookupOptionsList = this.ParseLookups("RelationshipWithAbuser");

                    this.childrenDeceasedLookupOptionsList = this.ParseMultiLookups("ChildrenDeceased");
                    this.incomeLookupOptionsList = this.ParseLookups("Income");
                    this.yesNoOptionsList = this.ParseLookups("YesNo");
                    this.peacemakerAssistanceOptionsList = this.ParseMultiLookups("PeacemakerAssistance");
                    this.religionOptionsList = this.ParseLookups("Religion");
                    this.levelOfEducationOptionsList = this.ParseLookups("LevelOfEducation");
                    this.vocationalSkillsOptionsList = this.ParseLookups("VocationalSkills");
                    this.occupationOptionsList = this.ParseLookups("Occupation");
                    this.householdMembersOptionsList = this.ParseMultiLookups("HouseholdMembers");
                    this.isHouseHoldDataLoaded = true;

                    this.spouseEducationLookupIdLookupOptionsList = this.ParseLookups("LevelOfEducation");
                    this.emergencyRelationshipOptionsList = this.ParseLookups("RelationshipWithClient");
                    this.isSpouseDataLoaded = true;

                    this.sleepPerNightLookupOptionsList = this.ParseLookups("SleepPerNight");
                    this.appetiteLookupOptionsList = this.ParseLookups("Appetite");
                    this.exerciseLookupOptionsList = this.ParseLookups("Exercise");
                    this.reasonForSeekingHelpLookupOptionsList = this.ParseMultiLookups("ReasonForSeekingHelp");
                    this.whoIsAbusingYouLookupOptionsList = this.ParseMultiLookups("AbusingPerson");
                    this.isPhysicalHealthDataLoaded = true;

                    this.sufferingFromAbuseLookupIdLookupOptionsList = this.ParseLookups("YesNo");

                    this.feelAboutAbuseLookupOptionsList = this.ParseMultiLookups("AbusingFeel");
                    this.farentsFeelAboutAbuseLookupOptionsList = this.ParseMultiLookups("AbusingParentsFeel");
                    this.lawFeelAboutAbuseLookupOptionsList = this.ParseMultiLookups("AbusingParentsFeel");

                    this.signsOfPhysicalAbuseLookupOptionsList = this.ParseLookups("YesNo");
                    this.weaponsUsedLookupOptionsList = this.ParseMultiLookups("AbusingWeapons");

                    this.typesOfPhyscialAbuseLookupOptionsList = this.ParseMultiLookups("TypesOfPhysicalAbuse");
                    this.frequencyOfPhyscialAbuseLookupOptionsList = this.ParseLookups("FrequencyOfAbuse");

                    this.typesOfEmotionalAbuseLookupOptionsList = this.ParseMultiLookups("TypesOfEmotionalAbuse");
                    this.frequencyOfEmotionalAbuseLookupOptionsList = this.ParseLookups("FrequencyOfAbuse");

                    this.typesOfSexualAbuseLookupOptionsList = this.ParseMultiLookups("TypesOfSexualAbuse");
                    this.frequencyOfSexualAbuseLookupOptionsList = this.ParseLookups("FrequencyOfAbuse");

                    this.typesOfEconomicAbuseLookupOptionsList = this.ParseMultiLookups("TypesOfEconomicalAbuse");
                    this.frequencyOfEconomicAbuseLookupOptionsList = this.ParseLookups("FrequencyOfAbuse");

                    this.reasonsForAbuseLookupOptionsList = this.ParseMultiLookups("ReasonForAbuse");

                    this.isAbuseDataLoaded = true;

                    this.sourceOfCaseLookupOptionList = this.ParseLookups("SourceOfCase");
                    this.typesOfCounselingLookupOptionList = this.ParseMultiLookups("TypesOfCounselling");
                    this.typesOfCounselingLookupOptionList_S = this.ParseLookups("TypesOfCounselling");
                    this.relationshipWithPMLookupOptionList = this.ParseLookups("RelationshipWithPM");
                    this.relationshipWithVictimLookupOptionsList = this.ParseLookups("AbusingPerson");
                    this.isManageDataLoaded = true;

                    this.MentalDressLookupOptionList = this.ParseMultiLookups("MentalDress");
                    this.MentalHygieneLookupOptionList = this.ParseMultiLookups("MentalHygiene");
                    this.MentalBodyTypeLookupOptionList = this.ParseMultiLookups("MentalBodyType");
                    this.MentalExpressionLookupOptionList = this.ParseMultiLookups("MentalExpression");
                    this.MentalMotorActivityLookupOptionList = this.ParseMultiLookups("MentalMotorActivity");
                    this.MentalVocabularyLookupOptionList = this.ParseMultiLookups("MentalVocabulary");
                    this.MentalImpulseControlLookupOptionList = this.ParseMultiLookups("MentalImpulseControl");
                    this.MentalSpeechLookupOptionList = this.ParseMultiLookups("MentalSpeech");
                    this.MentalBehaviourLookupOptionList = this.ParseMultiLookups("MentalBehaviour");
                    this.MentalContentLookupOptionList = this.ParseMultiLookups("MentalContent");
                    this.MentalFlowOfThoughtLookupOptionList = this.ParseMultiLookups("MentalFlowOfThought");
                    this.MentalOrientationLookupOptionList = this.ParseMultiLookups("MentalOrientation");
                    this.MentalEstimatedIntellectLookupOptionList = this.ParseMultiLookups("MentalEstimatedIntellect");
                    this.MentalAttentionLookupOptionList = this.ParseMultiLookups("MentalAttention");
                    this.MentalInsightLookupOptionList = this.ParseMultiLookups("MentalInsight");
                    this.MentalJudgementLookupOptionList = this.ParseMultiLookups("MentalJudgement");
                    this.MentalMemoryLookupOptionList = this.ParseMultiLookups("MentalMemory");
                    this.MentalInformationLookupOptionList = this.ParseMultiLookups("MentalInformation");
                    this.MentalAbstractionLookupOptionList = this.ParseMultiLookups("MentalAbstraction");
                    this.isMentalDataLoaded = true;

                    this.RespectedDuringYourVisitLookupOptionList = this.ParseLookups("RespectedDuringYourVisit");
                    this.FeelSafeAndSecureLookupOptionList = this.ParseLookups("YesNo");
                    this.FeelThatCounsellingLookupOptionList = this.ParseLookups("FeelThatCounselling");
                    this.AssistanceOfPeacemakerLookupOptionList = this.ParseLookups("AssistanceOfPeacemaker");
                    this.RecommendFreeCounsellingLookupOptionList = this.ParseLookups("RecommendFreeCounselling");
                    this.AbleToImproveLookupOptionList = this.ParseLookups("AbleToImprove");
                    this.OPMTeamToFollowupLookupOptionList = this.ParseLookups("YesNo");
                    this.isFeedbackDataLoaded = true;

                    this.outcomeLookupOptionList = this.ParseMultiLookups("Outcome");
                    this.documentsLookupOptionList = this.ParseMultiLookups("Documents");

                    this.isLegalDataLoaded = true;

                    break;
                default:
                    break;
            }
        });

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

                    this.getPeaceMakerAndCounselorList();
                    this.getCities();
                    this.getSpouseCities();


                    if (this.centersList.length > 0 && this.centerOptionList.length > 0 && this.counselorOptionsList.length > 0) {
                        this.isPrimaryDataLoaded = true;
                    }

                    this.primaryForm = this.caseBook.Case;
                    this.manageForm = this.caseBook.Manage;
                    this.familyHouseHold = this.caseBook.FamilyHouseHold;
                    this.spouseForm = this.caseBook.Spouse;
                    this.physicalHealthForm = this.caseBook.PhysicalHealth;
                    this.caseAbuseForm = this.caseBook.Abuse;
                    this.caseLegalForm = this.caseBook.Legal;
                });
        });
    }

    private getPeaceMakerAndCounselorList() {
       
        //Peace Maker
        var localPeaceMakerOptionsList = new Array<IOption>();
        for (var i = 0; i < this.peaceMakersList.length; i++) {
            if (this.peaceMakersList[i].CenterId == this.caseBook.Case.CenterId) {
                localPeaceMakerOptionsList.push({
                    value: this.peaceMakersList[i].PeaceMakerId.toString(),
                    label: this.peaceMakersList[i].FirstName + ' ' + this.peaceMakersList[i].LastName
                });
            }
        }
        this.peaceMakerOptionsList = localPeaceMakerOptionsList;

        //Counselor
        var localCounselorOptionsList = new Array<IOption>();
        for (var i = 0; i < this.counselorsList.length; i++) {
            if (this.counselorsList[i].CenterId == this.caseBook.Case.CenterId || this.counselorsList[i].IsGlobal) {
                localCounselorOptionsList.push({
                    value: this.counselorsList[i].CounselorId.toString(),
                    label: this.counselorsList[i].FirstName + ' ' + this.counselorsList[i].LastName
                });
            }
        }
        this.counselorOptionsList = localCounselorOptionsList;
    }

    private getCaseById() {
        var url = '/cases/redirect/' + this.selectedCaseId;
        this.router.navigate([url]);
    }

    /* Primary Info */
    public caseStatusOptionList: Array<IOption> = [];
    public centerOptionList: Array<IOption> = [];
    public peaceMakerOptionsList: Array<IOption> = [];
    public counselorOptionsList: Array<IOption> = [];
    public stateOptionsList: Array<IOption> = [];
    public cityOptionsList: Array<IOption> = [];

    public genderLookupOptionsList: Array<IOption> = [];
    public maritalStatusLookupOptionsList: Array<IOption> = [];
    public requireAssistanceLookupOptionsList: Array<IOption> = [];
    /* End of --- Primary Info */

    /* Start - Addresses */
    private getCities() {

        //Cities
        var localCityOptionsList = new Array<IOption>();
        for (var i = 0; i < this.statesList.length; i++) {
            for (var j = 0; j < this.statesList[i].Cities.length; j++) {
                localCityOptionsList.push({
                    value: this.statesList[i].Cities[j].CityId.toString(),
                    label: this.statesList[i].Cities[j].Title
                });
            }
        }
        this.cityOptionsList = localCityOptionsList;
    }
    /* End of - Addresses */

    /* Start - Children */
    public relationshipWithAbuserLookupOptionsList: Array<IOption> = [];
    /* End of - Children */    

    /* Start - Spouse */
    private getSpouseCities() {
        //Cities
        var localCityOptionsList = new Array<IOption>();
        for (var i = 0; i < this.statesList.length; i++) {
            for (var j = 0; j < this.statesList[i].Cities.length; j++) {
                    localCityOptionsList.push({
                        value: this.statesList[i].Cities[j].CityId.toString(),
                        label: this.statesList[i].Cities[j].Title
                });
            }
        }
        this.spouseCityOptionsList = localCityOptionsList;
    }
    /* End of - Spouse */

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
    /* End of - Abuse */

    /* Start - Manage Case */
    public sourceOfCaseLookupOptionList: Array<IOption> = [];
    public typesOfCounselingLookupOptionList: Array<IMultiSelectOption> = [];

    public typesOfCounselingLookupOptionList_S: Array<IOption> = [];
    public totalNoOfSessionsLookupOptionList: Array<IOption> = [];
    public totalHoursSpentLookupOptionList: Array<IOption> = [];
    public relationshipWithPMLookupOptionList: Array<IOption> = [];
    

    /* End of - Manage Case */

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
    /* End of - Mental */

    /* Start - Sessions */
    public RespectedDuringYourVisitLookupOptionList: Array<IOption> = [];
    public FeelSafeAndSecureLookupOptionList: Array<IOption> = [];
    public FeelThatCounsellingLookupOptionList: Array<IOption> = [];
    public AssistanceOfPeacemakerLookupOptionList: Array<IOption> = [];
    public RecommendFreeCounsellingLookupOptionList: Array<IOption> = [];
    public AbleToImproveLookupOptionList: Array<IOption> = [];
    public OPMTeamToFollowupLookupOptionList: Array<IOption> = [];
    /* End of - Sessions */
    
    /* Start - Legal Case */
    public outcomeLookupOptionList: Array<IMultiSelectOption> = [];
    public documentsLookupOptionList: Array<IMultiSelectOption> = [];
    /* End of - Legal Case */
}
