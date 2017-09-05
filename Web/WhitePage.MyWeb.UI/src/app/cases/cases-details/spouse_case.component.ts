import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { CaseBook, Case, CaseAddress, vCaseAddress, CaseFeedback } from '../../models/case.entities';

import { ValidationService } from '../../services/validation.service';
import { CasesService } from '../../services/cases.services';

import { SelectModule, IOption } from 'ng-select';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

import { ModalDirective } from 'ng2-bootstrap/modal';

import { Center, PeaceMaker, Counselor, Lookup, State } from '../../models/entities';

import { BaseCaseController } from './../basecase.controller';

import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import * as moment from 'moment';

@Component({
    selector: 'spouseCase',
    templateUrl: 'spouse_case.component.html',
    inputs: ['caseBook'],
})

export class SpouseCaseComponent implements OnInit {
    public caseBook: CaseBook;
    public spouseForm: FormGroup;
    public spouseCityOptionsList: Array<IOption> = [];
    public statesList: Array<State> = [];
    public isSpouseDataLoaded: boolean = false;

    public spouseEducationLookupIdLookupOptionsList: Array<IOption> = [];
    public spouseStateOptionsList: Array<IOption> = [];
    public emergencyRelationshipOptionsList: Array<IOption> = [];

    constructor(public fb: FormBuilder,
        public validationService: ValidationService,
        public casesService: CasesService,
        public toastr: ToastsManager) {
    }

    ngOnInit() {
        this.loadSpouseFormGroup();
        this.isSpouseDataLoaded = true;

        this.statesList = JSON.parse(localStorage.getItem("getAllStates"));
        this.spouseEducationLookupIdLookupOptionsList = BaseCaseController.staticParseLookups("LevelOfEducation");
        this.emergencyRelationshipOptionsList = BaseCaseController.staticParseLookups("RelationshipWithClient");
    }

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
        this.onSpouseStateSelected({ value: this.caseBook.Spouse.StateLookupId });
        this.spouseForm = this.fb.group({
            SpouseName: [this.caseBook.Spouse.SpouseName],
            SpouseHomePhone: [this.caseBook.Spouse.SpouseHomePhone, [Validators.minLength(10), this.validationService.mobileValidator]],
            SpouseMobilePhone: [this.caseBook.Spouse.SpouseMobilePhone, [Validators.minLength(10), this.validationService.mobileValidator]],
            SpouseOccupation: [this.caseBook.Spouse.SpouseOccupation],
            SpouseEducationLookupId: [this.caseBook.Spouse.SpouseEducationLookupId == undefined ? null : this.caseBook.Spouse.SpouseEducationLookupId.toString()],
            SpouseAddress: [this.caseBook.Spouse.SpouseAddress],
            Area: [this.caseBook.Spouse.Area],
            CityLookupId: [this.caseBook.Spouse.CityLookupId == undefined ? null : this.caseBook.Spouse.CityLookupId.toString()],
            StateLookupId: [this.caseBook.Spouse.StateLookupId == undefined ? null : this.caseBook.Spouse.StateLookupId.toString()],
            PIN: [this.caseBook.Spouse.PIN, [Validators.minLength(6), this.validationService.numericValidator]],

            PrimaryEmergencyContactName: [this.caseBook.Spouse.PrimaryEmergencyContactName],
            PrimaryEmergencyRelationshipToClientLookupId: [this.caseBook.Spouse.PrimaryEmergencyRelationshipToClientLookupId == undefined ? null : this.caseBook.Spouse.PrimaryEmergencyRelationshipToClientLookupId.toString()],
            PrimaryEmergencyContactPhoneNumber: [this.caseBook.Spouse.PrimaryEmergencyContactPhoneNumber, [Validators.minLength(10), this.validationService.mobileValidator]],
            PrimaryEmergencyContactAdress: [this.caseBook.Spouse.PrimaryEmergencyContactAdress],

            SecondaryEmergencyContactName: [this.caseBook.Spouse.SecondaryEmergencyContactName],
                SecondaryEmergencyRelationshipToClientLookupId: [this.caseBook.Spouse.SecondaryEmergencyRelationshipToClientLookupId == undefined ? null : this.caseBook.Spouse.SecondaryEmergencyRelationshipToClientLookupId.toString()],
                SecondaryEmergencyContactPhoneNumber: [this.caseBook.Spouse.SecondaryEmergencyContactPhoneNumber, [Validators.minLength(10), this.validationService.mobileValidator]],
                SecondaryEmergencyContactAdress: [this.caseBook.Spouse.SecondaryEmergencyContactAdress]

        });
    }

    public onUpdateSpouse() {
        this.caseBook.Spouse.SpouseName = this.spouseForm.controls['SpouseName'].value;
        this.caseBook.Spouse.SpouseHomePhone = this.spouseForm.controls['SpouseHomePhone'].value;
        this.caseBook.Spouse.SpouseMobilePhone = this.spouseForm.controls['SpouseMobilePhone'].value;
        this.caseBook.Spouse.SpouseOccupation = this.spouseForm.controls['SpouseOccupation'].value;
        this.caseBook.Spouse.SpouseEducationLookupId = this.spouseForm.controls['SpouseEducationLookupId'].value;

        this.caseBook.Spouse.SpouseAddress = this.spouseForm.controls['SpouseAddress'].value;
        this.caseBook.Spouse.Area = this.spouseForm.controls['Area'].value;
        this.caseBook.Spouse.CityLookupId = this.spouseForm.controls['CityLookupId'].value;
        this.caseBook.Spouse.StateLookupId = this.spouseForm.controls['StateLookupId'].value;
        this.caseBook.Spouse.PIN = this.spouseForm.controls['PIN'].value;

        this.caseBook.Spouse.PrimaryEmergencyContactName = this.spouseForm.controls['PrimaryEmergencyContactName'].value;
        this.caseBook.Spouse.PrimaryEmergencyRelationshipToClientLookupId = this.spouseForm.controls['PrimaryEmergencyRelationshipToClientLookupId'].value;
        this.caseBook.Spouse.PrimaryEmergencyContactPhoneNumber = this.spouseForm.controls['PrimaryEmergencyContactPhoneNumber'].value;
        this.caseBook.Spouse.PrimaryEmergencyContactAdress = this.spouseForm.controls['PrimaryEmergencyContactAdress'].value;

        this.caseBook.Spouse.SecondaryEmergencyContactName = this.spouseForm.controls['SecondaryEmergencyContactName'].value;
        this.caseBook.Spouse.SecondaryEmergencyRelationshipToClientLookupId = this.spouseForm.controls['SecondaryEmergencyRelationshipToClientLookupId'].value;
        this.caseBook.Spouse.SecondaryEmergencyContactPhoneNumber = this.spouseForm.controls['SecondaryEmergencyContactPhoneNumber'].value;
        this.caseBook.Spouse.SecondaryEmergencyContactAdress = this.spouseForm.controls['SecondaryEmergencyContactAdress'].value;

        this.casesService
            .updateSpouse(this.caseBook).subscribe(data => {
                this.toastr.success('Spouse information updated successfully');
            }, (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }

    /* End of - Spouse */
}