import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectModule, IOption } from 'ng-select';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { ValidationService } from '../../services/validation.service';
import { CasesService } from '../../services/cases.services';

import { BaseCaseController } from './../basecase.controller';

import { CaseBook, Case } from '../../models/case.entities';

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

    constructor(
        public fb: FormBuilder,
        private validationService: ValidationService,
        private casesService: CasesService,
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

    private loadHouseHoldFormGroup() {
    this.clientAndHouseholdForm = this.fb.group({
        ChildrenDeceasedLookupId: [this.caseBook.FamilyHouseHold.ChildrenDeceasedLookupId == undefined ? null : this.caseBook.FamilyHouseHold.ChildrenDeceasedLookupId.toString()],
        HouseHoldIncomeLookupId: [this.caseBook.FamilyHouseHold.HouseHoldIncomeLookupId == undefined ? null : this.caseBook.FamilyHouseHold.HouseHoldIncomeLookupId.toString()],
        SoughtHelpYesNoLookupId: [this.caseBook.FamilyHouseHold.SoughtHelpYesNoLookupId == undefined ? null : this.caseBook.FamilyHouseHold.SoughtHelpYesNoLookupId.toString()],
        SoughtHelpDesc: [this.caseBook.FamilyHouseHold.SoughtHelpDesc],
        SoughtHelpOutPut: [this.caseBook.FamilyHouseHold.SoughtHelpOutPut],
        PeacemakerAssistanceLookupId: [this.caseBook.FamilyHouseHold.PeacemakerAssistanceLookupId == undefined ? null : this.caseBook.FamilyHouseHold.PeacemakerAssistanceLookupId.toString()],
        PeacemakerAssistanceDesc: [this.caseBook.FamilyHouseHold.PeacemakerAssistanceDesc],
        PeacemakerFollowupYesNoLookupId: [this.caseBook.FamilyHouseHold.PeacemakerFollowupYesNoLookupId == undefined ? null : this.caseBook.FamilyHouseHold.PeacemakerFollowupYesNoLookupId.toString()],
        ClientSignedRegistrationFormYesNoLookupId: [this.caseBook.FamilyHouseHold.ClientSignedRegistrationFormYesNoLookupId == undefined ? null : this.caseBook.FamilyHouseHold.ClientSignedRegistrationFormYesNoLookupId.toString()],
        ClientEmailId: [this.caseBook.FamilyHouseHold.ClientEmailId, this.validationService.emailValidator],
        ReligionLookupId: [this.caseBook.FamilyHouseHold.ReligionLookupId == undefined ? null : this.caseBook.FamilyHouseHold.ReligionLookupId.toString()],
        LevelOfEducationLookupId: [this.caseBook.FamilyHouseHold.LevelOfEducationLookupId == undefined ? null : this.caseBook.FamilyHouseHold.LevelOfEducationLookupId.toString()],
        VocationalSkillsLookupId: [this.caseBook.FamilyHouseHold.VocationalSkillsLookupId == undefined ? null : this.caseBook.FamilyHouseHold.VocationalSkillsLookupId.toString()],
        VocationalSkillsDesc: [this.caseBook.FamilyHouseHold.VocationalSkillsDesc],
        OccupationLookupId: [this.caseBook.FamilyHouseHold.OccupationLookupId == undefined ? null : this.caseBook.FamilyHouseHold.OccupationLookupId.toString()],
        OccupationDesc: [this.caseBook.FamilyHouseHold.OccupationDesc],
        ClientIncomeLookupId: [this.caseBook.FamilyHouseHold.ClientIncomeLookupId == undefined ? null : this.caseBook.FamilyHouseHold.ClientIncomeLookupId.toString()],
        HouseHoldMembersLivingLookupId: [this.caseBook.FamilyHouseHold.HouseHoldMembersLivingLookupId == undefined ? null : this.caseBook.FamilyHouseHold.HouseHoldMembersLivingLookupId.toString()],
        YearsOfMarriage: [this.caseBook.FamilyHouseHold.YearsOfMarriage, [this.validationService.validateYears, this.validationService.validateYears]],
        ClientAgeAtFirstChild: [this.caseBook.FamilyHouseHold.ClientAgeAtFirstChild, [Validators.minLength(2), this.validationService.validateNumber]]
        });
    }

    public onUpdateHouseHoldInfo() {
        this.caseBook.FamilyHouseHold.HouseHoldIncomeLookupId = this.clientAndHouseholdForm.controls['HouseHoldIncomeLookupId'].value;
        this.caseBook.FamilyHouseHold.SoughtHelpYesNoLookupId = this.clientAndHouseholdForm.controls['SoughtHelpYesNoLookupId'].value;
        this.caseBook.FamilyHouseHold.SoughtHelpDesc = this.clientAndHouseholdForm.controls['SoughtHelpDesc'].value;
        this.caseBook.FamilyHouseHold.SoughtHelpOutPut = this.clientAndHouseholdForm.controls['SoughtHelpOutPut'].value;
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
        this.caseBook.FamilyHouseHold.YearsOfMarriage = this.clientAndHouseholdForm.controls['YearsOfMarriage'].value;
        this.caseBook.FamilyHouseHold.ClientAgeAtFirstChild = this.clientAndHouseholdForm.controls['ClientAgeAtFirstChild'].value;

        this.casesService.updateHouseHold(this.caseBook).subscribe(
            data => {
                this.toastr.success('Household information updated successfully');
            },
            (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            }
        );
    }
}