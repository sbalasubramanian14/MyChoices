import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { CaseBook, Case, CaseAddress, vCaseAddress } from '../../models/case.entities';

import { ValidationService } from '../../services/validation.service';
import { CasesService } from '../../services/cases.services';

import { SelectModule, IOption } from 'ng-select';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { ModalDirective } from 'ng2-bootstrap/modal';

import { Center, PeaceMaker, Counselor, Lookup } from '../../models/entities';

import { BaseCaseController } from './../basecase.controller';

import * as moment from 'moment';

@Component({
    selector: 'householdCase',
    templateUrl: 'household_case.component.html',
    inputs: ['caseBook'],
})

export class HouseholdCaseComponent implements OnInit {
    public caseBook: CaseBook;
    public clientAndHouseholdForm: FormGroup;
    public isHouseHoldDataLoaded: boolean = false;

    public childrenDeceasedLookupOptionsList: Array<IMultiSelectOption> = [];
    public incomeLookupOptionsList: Array<IOption> = [];
    public yesNoOptionsList: Array<IOption> = [];
    public peacemakerAssistanceOptionsList: Array<IMultiSelectOption> = [];
    public religionOptionsList: Array<IOption> = [];
    public levelOfEducationOptionsList: Array<IOption> = [];
    public vocationalSkillsOptionsList: Array<IOption> = [];
    public occupationOptionsList: Array<IOption> = [];
    public householdMembersOptionsList: Array<IMultiSelectOption> = [];

    constructor(public fb: FormBuilder,
        public validationService: ValidationService,
        public casesService: CasesService,
        public toastr: ToastsManager) {
        this.childrenDeceasedLookupOptionsList = BaseCaseController.staticParseMultiLookups("ChildrenDeceased");
        this.incomeLookupOptionsList = BaseCaseController.staticParseLookups("Income");
        this.yesNoOptionsList = BaseCaseController.staticParseLookups("YesNo");
        this.peacemakerAssistanceOptionsList = BaseCaseController.staticParseMultiLookups("PeacemakerAssistance");
        this.religionOptionsList = BaseCaseController.staticParseLookups("Religion");
        this.levelOfEducationOptionsList = BaseCaseController.staticParseLookups("LevelOfEducation");
        this.vocationalSkillsOptionsList = BaseCaseController.staticParseLookups("VocationalSkills");
        this.occupationOptionsList = BaseCaseController.staticParseLookups("Occupation");
        this.householdMembersOptionsList = BaseCaseController.staticParseMultiLookups("HouseholdMembers");
    }

    ngOnInit() {
        this.loadHouseHoldFormGroup();
        this.isHouseHoldDataLoaded = true;
    }

/* Start - client And Household */    

    private loadHouseHoldFormGroup() {
    this.clientAndHouseholdForm = this.fb.group({
        ChildrenDeceasedLookupId: new FormControl(this.caseBook.FamilyHouseHold.ChildrenDeceasedLookupId == undefined ? null : this.caseBook.FamilyHouseHold.ChildrenDeceasedLookupId.toString()),
        HouseHoldIncomeLookupId: new FormControl(this.caseBook.FamilyHouseHold.HouseHoldIncomeLookupId == undefined ? null : this.caseBook.FamilyHouseHold.HouseHoldIncomeLookupId.toString()),
        SoughtHelpYesNoLookupId: new FormControl(this.caseBook.FamilyHouseHold.SoughtHelpYesNoLookupId == undefined ? null : this.caseBook.FamilyHouseHold.SoughtHelpYesNoLookupId.toString()),
        SoughtHelpDesc: new FormControl(this.caseBook.FamilyHouseHold.SoughtHelpDesc),
        SoughtHelpOutPut: new FormControl(this.caseBook.FamilyHouseHold.SoughtHelpOutPut),
        PeacemakerAssistanceLookupId: new FormControl(this.caseBook.FamilyHouseHold.PeacemakerAssistanceLookupId == undefined ? null : this.caseBook.FamilyHouseHold.PeacemakerAssistanceLookupId.toString()),
        PeacemakerAssistanceDesc: new FormControl(this.caseBook.FamilyHouseHold.PeacemakerAssistanceDesc),
        PeacemakerFollowupYesNoLookupId: new FormControl(this.caseBook.FamilyHouseHold.PeacemakerFollowupYesNoLookupId == undefined ? null : this.caseBook.FamilyHouseHold.PeacemakerFollowupYesNoLookupId.toString()),
        ClientSignedRegistrationFormYesNoLookupId: new FormControl(this.caseBook.FamilyHouseHold.ClientSignedRegistrationFormYesNoLookupId == undefined ? null : this.caseBook.FamilyHouseHold.ClientSignedRegistrationFormYesNoLookupId.toString()),
        ClientEmailId: new FormControl(this.caseBook.FamilyHouseHold.ClientEmailId, this.validationService.emailValidator),
        ReligionLookupId: new FormControl(this.caseBook.FamilyHouseHold.ReligionLookupId == undefined ? null : this.caseBook.FamilyHouseHold.ReligionLookupId.toString()),
        LevelOfEducationLookupId: new FormControl(this.caseBook.FamilyHouseHold.LevelOfEducationLookupId == undefined ? null : this.caseBook.FamilyHouseHold.LevelOfEducationLookupId.toString()),
        VocationalSkillsLookupId: new FormControl(this.caseBook.FamilyHouseHold.VocationalSkillsLookupId == undefined ? null : this.caseBook.FamilyHouseHold.VocationalSkillsLookupId.toString()),
        VocationalSkillsDesc: new FormControl(this.caseBook.FamilyHouseHold.VocationalSkillsDesc),
        OccupationLookupId: new FormControl(this.caseBook.FamilyHouseHold.OccupationLookupId == undefined ? null : this.caseBook.FamilyHouseHold.OccupationLookupId.toString()),
        OccupationDesc: new FormControl(this.caseBook.FamilyHouseHold.OccupationDesc),
        ClientIncomeLookupId: new FormControl(this.caseBook.FamilyHouseHold.ClientIncomeLookupId == undefined ? null : this.caseBook.FamilyHouseHold.ClientIncomeLookupId.toString()),
        HouseHoldMembersLivingLookupId: new FormControl(this.caseBook.FamilyHouseHold.HouseHoldMembersLivingLookupId == undefined ? null : this.caseBook.FamilyHouseHold.HouseHoldMembersLivingLookupId.toString()),
        YearOfMarriage: new FormControl(this.caseBook.FamilyHouseHold.YearOfMarriage, [Validators.minLength(4), this.validationService.numericValidator]),
        ClientAgeAtFirstChild: new FormControl(this.caseBook.FamilyHouseHold.ClientAgeAtFirstChild, [Validators.minLength(2), this.validationService.validateNumber])
        });
    }

    public onUpdateHouseHoldInfo() {
        //this.caseBook.FamilyHouseHold.ChildrenDeceasedLookupId = this.clientAndHouseholdForm.controls['ChildrenDeceasedLookupId'].value;
        this.caseBook.FamilyHouseHold.HouseHoldIncomeLookupId = this.clientAndHouseholdForm.controls['HouseHoldIncomeLookupId'].value;
        this.caseBook.FamilyHouseHold.SoughtHelpYesNoLookupId = this.clientAndHouseholdForm.controls['SoughtHelpYesNoLookupId'].value;
        this.caseBook.FamilyHouseHold.SoughtHelpDesc = this.clientAndHouseholdForm.controls['SoughtHelpDesc'].value;
        this.caseBook.FamilyHouseHold.SoughtHelpOutPut = this.clientAndHouseholdForm.controls['SoughtHelpOutPut'].value;

        //this.caseBook.FamilyHouseHold.PeacemakerAssistanceLookupId = this.clientAndHouseholdForm.controls['PeacemakerAssistanceLookupId'].value;
        this.caseBook.FamilyHouseHold.PeacemakerAssistanceDesc = this.clientAndHouseholdForm.controls['PeacemakerAssistanceDesc'].value;
        this.caseBook.FamilyHouseHold.PeacemakerFollowupYesNoLookupId = this.clientAndHouseholdForm.controls['PeacemakerFollowupYesNoLookupId'].value;
        this.caseBook.FamilyHouseHold.ClientSignedRegistrationFormYesNoLookupId = this.clientAndHouseholdForm.controls['ClientSignedRegistrationFormYesNoLookupId'].value;

        this.caseBook.FamilyHouseHold.ClientEmailId = this.clientAndHouseholdForm.controls['ClientEmailId'].value;
        this.caseBook.FamilyHouseHold.ReligionLookupId = this.clientAndHouseholdForm.controls['ReligionLookupId'].value;
        this.caseBook.FamilyHouseHold.LevelOfEducationLookupId = this.clientAndHouseholdForm.controls['LevelOfEducationLookupId'].value;
        this.caseBook.FamilyHouseHold.VocationalSkillsLookupId = this.clientAndHouseholdForm.controls['VocationalSkillsLookupId'].value;
        this.caseBook.FamilyHouseHold.VocationalSkillsDesc = this.clientAndHouseholdForm.controls['VocationalSkillsDesc'].value;

        this.caseBook.FamilyHouseHold.OccupationLookupId = this.clientAndHouseholdForm.controls['OccupationLookupId'].value;
        this.caseBook.FamilyHouseHold.OccupationDesc = this.clientAndHouseholdForm.controls['OccupationDesc'].value;
        this.caseBook.FamilyHouseHold.ClientIncomeLookupId = this.clientAndHouseholdForm.controls['ClientIncomeLookupId'].value;

        //this.caseBook.FamilyHouseHold.HouseHoldMembersLivingLookupId = this.clientAndHouseholdForm.controls['HouseHoldMembersLivingLookupId'].value;
        this.caseBook.FamilyHouseHold.YearOfMarriage = this.clientAndHouseholdForm.controls['YearOfMarriage'].value;
        this.caseBook.FamilyHouseHold.ClientAgeAtFirstChild = this.clientAndHouseholdForm.controls['ClientAgeAtFirstChild'].value;

        this.casesService
            .updateHouseHold(this.caseBook).subscribe(data => {
                this.toastr.success('Household information updated successfully');
            }, (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }
    /* End of - client And Household */
}