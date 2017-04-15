import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { SelectModule, IOption } from 'ng-select';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

import { CasesService } from '../services/cases.services';
import { CommonService } from '../services/common.services';
import { CaseBook, Case, CaseAddress, vCaseAddress, CaseChildren, vCaseChildren, vCaseOffender, CaseOffender } from '../models/case.entities';
import { BaseCaseController } from './basecase.controller';
import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
    templateUrl: 'cases.detailed.html'
})
export class CasesDetailedComponent extends BaseCaseController implements OnInit {

    public caseBook: CaseBook;
    private selectedCaseId: number;

    public casePrimaryForm: FormGroup;
    public caseAddressForm: FormGroup;
    public caseChildrenForm: FormGroup;
    public clientAndHouseholdForm: FormGroup;
    public spouseForm: FormGroup;
    public physicalHealthForm: FormGroup;
    public caseOffenderForm: FormGroup;

    public router: Router;
    public isPrimaryDataLoaded: boolean = false;
    public isHouseHoldDataLoaded: boolean = false;
    public isSpouseDataLoaded: boolean = false;
    public isPhysicalHealthDataLoaded: boolean = false;

    public childrenDeceasedLookupOptionsList: Array<IOption> = [];
    public incomeLookupOptionsList: Array<IOption> = [];
    public yesNoOptionsList: Array<IOption> = [];

    public peacemakerAssistanceOptionsList: Array<IOption> = [];
    public religionOptionsList: Array<IOption> = [];
    public levelOfEducationOptionsList: Array<IOption> = [];
    public vocationalSkillsOptionsList: Array<IOption> = [];
    public occupationOptionsList: Array<IOption> = [];
    public householdMembersOptionsList: Array<IOption> = [];

    public spouseEducationLookupIdLookupOptionsList: Array<IOption> = [];
    public spouseStateOptionsList: Array<IOption> = [];
    public spouseCityOptionsList: Array<IOption> = [];
    public emergencyRelationshipOptionsList: Array<IOption> = [];

    public sleepPerNightLookupOptionsList: Array<IOption> = [];
    public appetiteLookupOptionsList: Array<IOption> = [];
    public exerciseLookupOptionsList: Array<IOption> = [];
    public reasonForSeekingHelpLookupOptionsList: Array<IOption> = [];
    public whoIsAbusingYouLookupOptionsList: Array<IOption> = [];

    constructor(public fb: FormBuilder,
        public casesService: CasesService,
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

                    this.childrenDeceasedLookupOptionsList = this.ParseLookups("ChildrenDeceased");
                    this.incomeLookupOptionsList = this.ParseLookups("Income");
                    this.yesNoOptionsList = this.ParseLookups("YesNo");
                    this.peacemakerAssistanceOptionsList = this.ParseLookups("PeacemakerAssistance");
                    this.religionOptionsList = this.ParseLookups("Religion");
                    this.levelOfEducationOptionsList = this.ParseLookups("LevelOfEducation");
                    this.vocationalSkillsOptionsList = this.ParseLookups("VocationalSkills");
                    this.occupationOptionsList = this.ParseLookups("Occupation");
                    this.householdMembersOptionsList = this.ParseLookups("HouseholdMembers");
                    this.isHouseHoldDataLoaded = true;

                    this.spouseEducationLookupIdLookupOptionsList = this.ParseLookups("LevelOfEducation");
                    this.emergencyRelationshipOptionsList = this.ParseLookups("RelationshipWithClient");
                    this.isSpouseDataLoaded = true;

                    this.sleepPerNightLookupOptionsList = this.ParseLookups("SleepPerNight");
                    this.appetiteLookupOptionsList = this.ParseLookups("Appetite");
                    this.exerciseLookupOptionsList = this.ParseLookups("Exercise");
                    this.reasonForSeekingHelpLookupOptionsList = this.ParseLookups("ReasonForSeekingHelp");
                    this.whoIsAbusingYouLookupOptionsList = this.ParseLookups("AbusingPerson");
                    this.isPhysicalHealthDataLoaded = true;
                    break;
                default:
                    break;
            }
        });

    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.selectedCaseId = params['id'];
            this.getCaseById();
        });
    }

    private onCenterSelected(center: any) {
        if (this.caseBook.Case.CenterId == null || this.caseBook.Case.CenterId <= 0) {
            this.peaceMakerOptionsList = new Array<IOption>();
            this.counselorOptionsList = new Array<IOption>();
            return;
        }

        //Peace Maker
        var localPeaceMakerOptionsList = new Array<IOption>();
        for (var i = 0; i < this.peaceMakersList.length; i++) {
            if (this.peaceMakersList[i].CenterId == this.caseBook.Case.CenterId) {
                localPeaceMakerOptionsList.push({
                    value: this.peaceMakersList[i].PeaceMakerId.toString(),
                    label: this.peaceMakersList[i].FirstName
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
                    label: this.counselorsList[i].FirstName
                });
            }
        }
        this.counselorOptionsList = localCounselorOptionsList;
    }

    private getCaseById() {
        this.casesService
            .GetCaseById(this.selectedCaseId)
            .subscribe(data => {
                this.caseBook = data;

                this.onCenterSelected(null);
                console.log("load centers");

                if (this.centersList.length > 0 && this.centerOptionList.length > 0 && this.counselorOptionsList.length > 0) {
                    this.isPrimaryDataLoaded = true;
                }
                this.loadPrimayCaseTab();
                this.loadHouseHoldFormGroup();
                this.loadSpouseFormGroup();
                this.loadPhysicalHealthFromGroup();
            });
    }

    /* Primary Info */
    public centerOptionList: Array<IOption> = [];
    public peaceMakerOptionsList: Array<IOption> = [];
    public counselorOptionsList: Array<IOption> = [];
    public stateOptionsList: Array<IOption> = [];
    public cityOptionsList: Array<IOption> = [];

    public genderLookupOptionsList: Array<IOption> = [];
    public maritalStatusLookupOptionsList: Array<IOption> = [];
    public requireAssistanceLookupOptionsList: Array<IOption> = [];

    private loadPrimayCaseTab() {
        this.casePrimaryForm = this.fb.group({
            CenterId: new FormControl(this.caseBook.Case.CenterId.toString(), Validators.required),
            PeaceMakerId: new FormControl(this.caseBook.Case.PeaceMakerId.toString(), Validators.required),
            CounselorId: new FormControl(this.caseBook.Case.CounselorId.toString(), Validators.required),

            ClientFirstName: new FormControl(this.caseBook.Case.ClientFirstName, Validators.required),
            ClientLastName: new FormControl(this.caseBook.Case.ClientLastName, Validators.required),
            FatherName: new FormControl(this.caseBook.Case.FatherName, Validators.required),
            Mi: new FormControl(this.caseBook.Case.Mi),
            GenderLookupId: new FormControl(this.caseBook.Case.GenderLookupId.toString(), Validators.required),

            MaritalStatusLookupId: new FormControl(this.caseBook.Case.MaritalStatusLookupId.toString(), Validators.required),
            RequireAssistanceLookupId: new FormControl(this.caseBook.Case.RequireAssistanceLookupId.toString(), Validators.required),
            Remarks: new FormControl(this.caseBook.Case.Remarks),
            MobileNumber: new FormControl(this.caseBook.Case.MobileNumber, Validators.required)
        });
    }

    public onPrimayUpdate() {
        var caseBookNew = new CaseBook();
        caseBookNew.Case = new Case();
        caseBookNew.Case.CaseId = this.caseBook.Case.CaseId;
        caseBookNew.Case.CenterId = this.casePrimaryForm.controls['CenterId'].value;
        caseBookNew.Case.PeaceMakerId = this.casePrimaryForm.controls['PeaceMakerId'].value;
        caseBookNew.Case.CounselorId = this.casePrimaryForm.controls['CounselorId'].value;
        caseBookNew.Case.ClientFirstName = this.casePrimaryForm.controls['ClientFirstName'].value;
        caseBookNew.Case.ClientLastName = this.casePrimaryForm.controls['ClientLastName'].value;
        caseBookNew.Case.FatherName = this.casePrimaryForm.controls['FatherName'].value;
        caseBookNew.Case.Mi = this.casePrimaryForm.controls['Mi'].value;
        caseBookNew.Case.GenderLookupId = this.casePrimaryForm.controls['GenderLookupId'].value;
        caseBookNew.Case.MaritalStatusLookupId = this.casePrimaryForm.controls['MaritalStatusLookupId'].value;
        caseBookNew.Case.Remarks = this.casePrimaryForm.controls['Remarks'].value;
        caseBookNew.Case.MobileNumber = this.casePrimaryForm.controls['MobileNumber'].value;

        this.casesService
            .updatePrimaryInfo(caseBookNew).subscribe(data => {

                this.toastr.success('Primary Info Updated Successfully');

            }, (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }

    /* End of --- Primary Info */

    /* Start - Addresses */

    private onStateSelected(state: any) {
        if (state == undefined || state.value == undefined) {
            this.cityOptionsList = new Array<IOption>();
            return;
        }

        //Cities
        var localCityOptionsList = new Array<IOption>();
        for (var i = 0; i < this.statesList.length; i++) {
            if (this.statesList[i].StateId == state.value) {
                for (var j = 0; j < this.statesList[i].Cities.length; j++) {
                    localCityOptionsList.push({
                        value: this.statesList[i].Cities[j].CityId.toString(),
                        label: this.statesList[i].Cities[j].Title
                    });
                }
            }
        }
        this.cityOptionsList = localCityOptionsList;
    }

    @ViewChild('addressModal') public addressModal: ModalDirective;

    public addNewAddress() {
        this.caseBook.SelectedAddress = new CaseAddress();
        this.caseBook.SelectedAddress.CaseId = this.caseBook.Case.CaseId;

        this.caseAddressForm = this.fb.group({
            Address: new FormControl(this.caseBook.SelectedAddress.Address, Validators.required),
            Area: new FormControl(this.caseBook.SelectedAddress.Area, Validators.required),
            PIN: new FormControl(this.caseBook.SelectedAddress.PIN, Validators.required),
            StateId: new FormControl(this.caseBook.SelectedAddress.StateId == undefined ? null : this.caseBook.SelectedAddress.StateId.toString(), Validators.required),
            CityId: new FormControl(this.caseBook.SelectedAddress.CityId == undefined ? null : this.caseBook.SelectedAddress.CityId.toString(), Validators.required)
        });
        this.addressModal.show();
    }

    public editAddress(address: vCaseAddress) {
        this.caseBook.SelectedAddress = new CaseAddress();
        this.caseBook.SelectedAddress.CaseAddressId = address.CaseAddressId;
        this.caseBook.SelectedAddress.CaseId = address.CaseId;
        this.caseBook.SelectedAddress.Address = address.Address;
        this.caseBook.SelectedAddress.Area = address.Area;
        this.caseBook.SelectedAddress.CityId = address.CityId;
        this.caseBook.SelectedAddress.StateId = address.StateId;
        this.caseBook.SelectedAddress.PIN = address.PIN;
        this.caseBook.SelectedAddress.CreatedBy = address.CreatedBy;
        this.caseBook.SelectedAddress.CreatedDateTime = address.CreatedDateTime;
        this.caseBook.SelectedAddress.ModifiedBy = address.ModifiedBy;
        this.caseBook.SelectedAddress.ModifiedDatetime = address.ModifiedDatetime;

        this.onStateSelected({ value: address.StateId });

        debugger;
        console.log({ value: address.StateId });
        this.caseAddressForm = this.fb.group({
            Address: new FormControl(this.caseBook.SelectedAddress.Address, Validators.required),
            Area: new FormControl(this.caseBook.SelectedAddress.Area, Validators.required),
            PIN: new FormControl(this.caseBook.SelectedAddress.PIN, Validators.required),
            StateId: new FormControl(this.caseBook.SelectedAddress.StateId.toString(), Validators.required),
            CityId: new FormControl(this.caseBook.SelectedAddress.CityId.toString(), Validators.required)
        });
        this.addressModal.show();
    }

    public hideAddressModal(): void {
        this.addressModal.hide();
    }

    public saveAddress(address: vCaseAddress) {
        this.caseBook.SelectedAddress.Address = this.caseAddressForm.controls['Address'].value;
        this.caseBook.SelectedAddress.Area = this.caseAddressForm.controls['Area'].value;
        this.caseBook.SelectedAddress.CityId = this.caseAddressForm.controls['CityId'].value;
        this.caseBook.SelectedAddress.StateId = this.caseAddressForm.controls['StateId'].value;
        this.caseBook.SelectedAddress.PIN = this.caseAddressForm.controls['PIN'].value;

        this.casesService
            .updateAddress(this.caseBook).subscribe(data => {
                this.addressModal.hide();
                this.getCaseById();
                this.toastr.success('Address updated successfully');

            }, (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }
    /* End of - Addresses */

    /* Start - Children */
    public relationshipWithAbuserLookupOptionsList: Array<IOption> = [];
    @ViewChild('childrenModal') public childrenModal: ModalDirective;

    public addNewChild() {
        this.caseBook.SelectedChildren = new CaseChildren();
        this.caseBook.SelectedChildren.CaseId = this.caseBook.Case.CaseId;

        this.caseChildrenForm = this.fb.group({
            Name: new FormControl(this.caseBook.SelectedChildren.Name, Validators.required),
            Age: new FormControl(this.caseBook.SelectedChildren.Age, Validators.required),
            GenderLookupId: new FormControl(this.caseBook.SelectedChildren.GenderLookupId == undefined ? null : this.caseBook.SelectedChildren.GenderLookupId.toString(), Validators.required),
            RelationshipWithAbuserLookupId: new FormControl(this.caseBook.SelectedChildren.RelationshipWithAbuserLookupId == undefined ? null : this.caseBook.SelectedChildren.RelationshipWithAbuserLookupId.toString(), Validators.required)
        });
        this.childrenModal.show();
    }

    public editChild(children: vCaseChildren) {
        this.caseBook.SelectedChildren = new CaseAddress();
        this.caseBook.SelectedChildren.CaseChildrenId = children.CaseChildrenId;
        this.caseBook.SelectedChildren.CaseId = children.CaseId;
        this.caseBook.SelectedChildren.Name = children.Name;
        this.caseBook.SelectedChildren.Age = children.Age;
        this.caseBook.SelectedChildren.GenderLookupId = children.GenderLookupId;
        this.caseBook.SelectedChildren.RelationshipWithAbuserLookupId = children.RelationshipWithAbuserLookupId;

        this.caseBook.SelectedChildren.CreatedBy = children.CreatedBy;
        this.caseBook.SelectedChildren.CreatedDateTime = children.CreatedDateTime;
        this.caseBook.SelectedChildren.ModifiedBy = children.ModifiedBy;
        this.caseBook.SelectedChildren.ModifiedDatetime = children.ModifiedDatetime;

        this.caseChildrenForm = this.fb.group({
            Name: new FormControl(this.caseBook.SelectedChildren.Name, Validators.required),
            Age: new FormControl(this.caseBook.SelectedChildren.Age, Validators.required),
            GenderLookupId: new FormControl(this.caseBook.SelectedChildren.GenderLookupId.toString(), Validators.required),
            RelationshipWithAbuserLookupId: new FormControl(this.caseBook.SelectedChildren.RelationshipWithAbuserLookupId.toString(), Validators.required)
        });
        this.childrenModal.show();
    }

    public hideChildrenModal(): void {
        this.childrenModal.hide();
    }

    public saveChildren(address: vCaseChildren) {
        this.caseBook.SelectedChildren.Name = this.caseChildrenForm.controls['Name'].value;
        this.caseBook.SelectedChildren.Age = this.caseChildrenForm.controls['Age'].value;
        this.caseBook.SelectedChildren.GenderLookupId = this.caseChildrenForm.controls['GenderLookupId'].value;
        this.caseBook.SelectedChildren.RelationshipWithAbuserLookupId = this.caseChildrenForm.controls['RelationshipWithAbuserLookupId'].value;

        this.casesService
            .updateChildren(this.caseBook).subscribe(data => {
                this.addressModal.hide();
                this.getCaseById();
                this.toastr.success('Children updated successfully');

            }, (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }
    /* End of - Children */

    /* Start - client And Household */

    public onUpdateHouseHoldInfo() {
        console.log(this.caseBook);
    }

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
            ClientEmailId: new FormControl(this.caseBook.FamilyHouseHold.ClientEmailId),
            ReligionLookupId: new FormControl(this.caseBook.FamilyHouseHold.ReligionLookupId == undefined ? null : this.caseBook.FamilyHouseHold.ReligionLookupId.toString()),
            LevelOfEducationLookupId: new FormControl(this.caseBook.FamilyHouseHold.LevelOfEducationLookupId == undefined ? null : this.caseBook.FamilyHouseHold.LevelOfEducationLookupId.toString()),
            VocationalSkillsLookupId: new FormControl(this.caseBook.FamilyHouseHold.VocationalSkillsLookupId == undefined ? null : this.caseBook.FamilyHouseHold.VocationalSkillsLookupId.toString()),
            OccupationLookupId: new FormControl(this.caseBook.FamilyHouseHold.OccupationLookupId == undefined ? null : this.caseBook.FamilyHouseHold.OccupationLookupId.toString()),
            OccupationDesc: new FormControl(this.caseBook.FamilyHouseHold.OccupationDesc),
            ClientIncomeLookupId: new FormControl(this.caseBook.FamilyHouseHold.ClientIncomeLookupId == undefined ? null : this.caseBook.FamilyHouseHold.ClientIncomeLookupId.toString()),
            HouseHoldMembersLivingLookupId: new FormControl(this.caseBook.FamilyHouseHold.HouseHoldMembersLivingLookupId == undefined ? null : this.caseBook.FamilyHouseHold.HouseHoldMembersLivingLookupId.toString()),
            YearOfMarriage: new FormControl(this.caseBook.FamilyHouseHold.YearOfMarriage),
            ClientAgeAtFirstChild: new FormControl(this.caseBook.FamilyHouseHold.ClientAgeAtFirstChild)
        });
    }
    /* End of - client And Household */

    /* Start - Spouse */
    private onSpouseStateSelected(state: any) {
        if (state == undefined || state.value == undefined) {
            this.spouseCityOptionsList = new Array<IOption>();
            return;
        }

        //Cities
        var localCityOptionsList = new Array<IOption>();
        for (var i = 0; i < this.statesList.length; i++) {
            if (this.statesList[i].StateId == state.value) {
                for (var j = 0; j < this.statesList[i].Cities.length; j++) {
                    localCityOptionsList.push({
                        value: this.statesList[i].Cities[j].CityId.toString(),
                        label: this.statesList[i].Cities[j].Title
                    });
                }
            }
        }
        this.spouseCityOptionsList = localCityOptionsList;
    }

    private loadSpouseFormGroup() {
        this.spouseForm = this.fb.group({
            SpouseName: new FormControl(this.caseBook.Spouse.SpouseName),
            SpouseHomePhone: new FormControl(this.caseBook.Spouse.SpouseHomePhone),
            SpouseMobilePhone: new FormControl(this.caseBook.Spouse.SpouseMobilePhone),
            SpouseOccupation: new FormControl(this.caseBook.Spouse.SpouseOccupation),
            SpouseEducationLookupId: new FormControl(this.caseBook.Spouse.SpouseEducationLookupId == undefined ? null : this.caseBook.Spouse.SpouseEducationLookupId.toString()),
            SpouseAddress: new FormControl(this.caseBook.Spouse.SpouseAddress),
            Area: new FormControl(this.caseBook.Spouse.Area),
            CityLookupId: new FormControl(this.caseBook.Spouse.CityLookupId == undefined ? null : this.caseBook.Spouse.CityLookupId.toString()),
            StateLookupId: new FormControl(this.caseBook.Spouse.StateLookupId == undefined ? null : this.caseBook.Spouse.StateLookupId.toString()),
            PIN: new FormControl(this.caseBook.Spouse.PIN),

            PrimaryEmergencyContactName: new FormControl(this.caseBook.Spouse.PrimaryEmergencyContactName),
            PrimaryEmergencyRelationshipToClientLookupId: new FormControl(this.caseBook.Spouse.PrimaryEmergencyRelationshipToClientLookupId == undefined ? null : this.caseBook.Spouse.PrimaryEmergencyRelationshipToClientLookupId.toString()),
            PrimaryEmergencyContactPhoneNumber: new FormControl(this.caseBook.Spouse.PrimaryEmergencyContactPhoneNumber),
            PrimaryEmergencyContactAdress: new FormControl(this.caseBook.Spouse.PrimaryEmergencyContactAdress),

            SecondaryEmergencyContactName: new FormControl(this.caseBook.Spouse.SecondaryEmergencyContactName),
            SecondaryEmergencyRelationshipToClientLookupId: new FormControl(this.caseBook.Spouse.SecondaryEmergencyRelationshipToClientLookupId == undefined ? null : this.caseBook.Spouse.SecondaryEmergencyRelationshipToClientLookupId.toString()),
            SecondaryEmergencyContactPhoneNumber: new FormControl(this.caseBook.Spouse.SecondaryEmergencyContactPhoneNumber),
            SecondaryEmergencyContactAdress: new FormControl(this.caseBook.Spouse.SecondaryEmergencyContactAdress)

        });
    }

    public onUpdateSpouse() {
        console.log(this.caseBook);
    }

    /* End of - Spouse */

    /* Physical Health */


    private loadPhysicalHealthFromGroup() {        
        this.physicalHealthForm = this.fb.group({
            SufferingFromAnyMajorIllnessLookupId: new FormControl(this.caseBook.PhysicalHealth.SufferingFromAnyMajorIllnessLookupId == undefined ? null : this.caseBook.PhysicalHealth.SufferingFromAnyMajorIllnessLookupId.toString()),
            SufferingFromAnyMajorIllnessDesc: new FormControl(this.caseBook.PhysicalHealth.SufferingFromAnyMajorIllnessDesc),

            DiagnosedPsychiatricIllnessLookupId: new FormControl(this.caseBook.PhysicalHealth.DiagnosedPsychiatricIllnessLookupId == undefined ? null : this.caseBook.PhysicalHealth.DiagnosedPsychiatricIllnessLookupId.toString()),
            DiagnosedPsychiatricIllnessDesc: new FormControl(this.caseBook.PhysicalHealth.DiagnosedPsychiatricIllnessDesc),

            SleepPerNightLookupId: new FormControl(this.caseBook.PhysicalHealth.SleepPerNightLookupId == undefined ? null : this.caseBook.PhysicalHealth.SleepPerNightLookupId.toString()),
            AppetiteLookupId: new FormControl(this.caseBook.PhysicalHealth.AppetiteLookupId == undefined ? null : this.caseBook.PhysicalHealth.AppetiteLookupId.toString()),
            ExerciseLookupId: new FormControl(this.caseBook.PhysicalHealth.ExerciseLookupId == undefined ? null : this.caseBook.PhysicalHealth.ExerciseLookupId.toString()),

            AnyMedicationLookupId: new FormControl(this.caseBook.PhysicalHealth.AnyMedicationLookupId == undefined ? null : this.caseBook.PhysicalHealth.AnyMedicationLookupId.toString()),
            AnyMedicationDesc: new FormControl(this.caseBook.PhysicalHealth.AnyMedicationDesc),

            AnySubstanceLookupId: new FormControl(this.caseBook.PhysicalHealth.AnySubstanceLookupId == undefined ? null : this.caseBook.PhysicalHealth.AnySubstanceLookupId.toString()),
            AnySubstanceDesc: new FormControl(this.caseBook.PhysicalHealth.AnySubstanceDesc),

            CurrentlyPregnantLookup: new FormControl(this.caseBook.PhysicalHealth.CurrentlyPregnantLookup == undefined ? null : this.caseBook.PhysicalHealth.CurrentlyPregnantLookup.toString()),
            CurrentlyPregnantDesc: new FormControl(this.caseBook.PhysicalHealth.CurrentlyPregnantDesc),

            ReasonForSeekingHelpLookupId: new FormControl(this.caseBook.PhysicalHealth.ReasonForSeekingHelpLookupId == undefined ? null : this.caseBook.PhysicalHealth.ReasonForSeekingHelpLookupId.toString()),
            WhoIsAbusingYouLookupId: new FormControl(this.caseBook.PhysicalHealth.WhoIsAbusingYouLookupId == undefined ? null : this.caseBook.PhysicalHealth.WhoIsAbusingYouLookupId.toString()),
            WhoIsAbusingYouDesc: new FormControl(this.caseBook.PhysicalHealth.WhoIsAbusingYouDesc == undefined ? null : this.caseBook.PhysicalHealth.WhoIsAbusingYouDesc.toString())

        });
    }

    public onUpdatePhysicalHealth() {
        console.log(this.caseBook);
    }
    /* End of - Physical Health */

    /* Start - Offender */
    
    @ViewChild('offenderModal') public offenderModal: ModalDirective;

    public addNewOffender() {
        this.caseBook.SelectedOffender = new CaseOffender();
        this.caseBook.SelectedOffender.CaseId = this.caseBook.Case.CaseId;

        this.caseOffenderForm = this.fb.group({
            Name: new FormControl(this.caseBook.SelectedOffender.Name, Validators.required),
            Age: new FormControl(this.caseBook.SelectedOffender.Age, Validators.required),
            GenderLookupId: new FormControl(this.caseBook.SelectedOffender.GenderLookupId == undefined ? null : this.caseBook.SelectedOffender.GenderLookupId.toString(), Validators.required),
            RelationshipWithVictimLookupId: new FormControl(this.caseBook.SelectedOffender.RelationshipWithVictimLookupId == undefined ? null : this.caseBook.SelectedOffender.RelationshipWithVictimLookupId.toString(), Validators.required)
        });
        this.offenderModal.show();
    }

    public editOffender(offender: vCaseOffender) {
        this.caseBook.SelectedOffender = new CaseOffender();
        this.caseBook.SelectedOffender.CaseOffenderId = offender.CaseOffenderId;
        this.caseBook.SelectedOffender.CaseId = offender.CaseId;
        this.caseBook.SelectedOffender.Name = offender.Name;
        this.caseBook.SelectedOffender.Age = offender.Age;
        this.caseBook.SelectedOffender.GenderLookupId = offender.GenderLookupId;
        this.caseBook.SelectedOffender.RelationshipWithVictimLookupId = offender.RelationshipWithVictimLookupId;        

        this.caseOffenderForm = this.fb.group({
            Name: new FormControl(this.caseBook.SelectedOffender.Name, Validators.required),
            Age: new FormControl(this.caseBook.SelectedOffender.Age, Validators.required),
            GenderLookupId: new FormControl(this.caseBook.SelectedOffender.GenderLookupId == undefined ? null : this.caseBook.SelectedOffender.GenderLookupId.toString(), Validators.required),
            RelationshipWithVictimLookupId: new FormControl(this.caseBook.SelectedOffender.RelationshipWithVictimLookupId == undefined ? null : this.caseBook.SelectedOffender.RelationshipWithVictimLookupId.toString(), Validators.required)
        });
        this.offenderModal.show();
    }

    public hideOffenderModal(): void {
        this.offenderModal.hide();
    }

    public saveOffender(offender: vCaseOffender) {
        this.caseBook.SelectedOffender.Name = this.caseOffenderForm.controls['Name'].value;
        this.caseBook.SelectedOffender.Age = this.caseOffenderForm.controls['Age'].value;
        this.caseBook.SelectedOffender.GenderLookupId = this.caseOffenderForm.controls['GenderLookupId'].value;
        this.caseBook.SelectedOffender.RelationshipWithVictimLookupId = this.caseOffenderForm.controls['RelationshipWithVictimLookupId'].value;

        this.casesService
            .updateOffender(this.caseBook).subscribe(data => {
                this.offenderModal.hide();
                this.getCaseById();
                this.toastr.success('Offender updated successfully');

            }, (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }
    /* End of - Offender */
}
