import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from 'ng-select';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ModalDirective } from 'ng2-bootstrap/modal';

import { ValidationService } from '../../services/validation.service';
import { CasesService } from '../../services/cases.services';

import { CaseBook, Case, CaseAddress, vCaseAddress } from '../../models/case.entities';
import { Center, PeaceMaker, Counselor, Lookup, State } from '../../models/entities';

import { BaseCaseController } from './../basecase.controller';

@Component({
    selector: 'primaryCase',
    templateUrl: 'primary_case.component.html',
    styleUrls: ['../cases.detailed.scss'],
    inputs: ['caseBook'],
})

export class PrimaryCaseComponent implements OnInit {
    public caseBook: CaseBook;
    public casePrimaryForm: FormGroup;
    public caseAddressForm: FormGroup;
    public isPrimaryDataLoaded: boolean = false;

    public centerList: Array<Center> = [];
    public peaceMakersList: Array<PeaceMaker> = [];
    public counselorsList: Array<Counselor> = [];
    public lookupsList: Array<Lookup> = [];
    public statesList: Array<State> = [];

    public stateOptionsList: Array<IOption> = [];
    public cityOptionsList: Array<IOption> = [];
    public centerOptionList: Array<IOption> = [];
    public peaceMakerOptionsList: Array<IOption> = [];
    public counselorOptionsList: Array<IOption> = [];
    public genderLookupOptionsList: Array<IOption> = [];
    public maritalStatusLookupOptionsList: Array<IOption> = [];
    public requireAssistanceLookupOptionsList: Array<IOption> = [];

    constructor(
        public fb: FormBuilder,
        private validationService: ValidationService,
        private casesService: CasesService,
        public toastr: ToastsManager) {

        this.genderLookupOptionsList = BaseCaseController.staticParseLookups("Gender");
        this.maritalStatusLookupOptionsList = BaseCaseController.staticParseLookups("MaritalStatus");
        this.requireAssistanceLookupOptionsList = BaseCaseController.staticParseLookups("RequiredAssistance");
    }

    ngOnInit() {
        /* getPeacemaker - starts */
        var localPeaceMakerOptionsList = new Array<IOption>();
        this.peaceMakersList = JSON.parse(localStorage.getItem("getAllPeaceMakers"));
        for (var i = 0; i < this.peaceMakersList.length; i++) {
            if (this.peaceMakersList[i].CenterId == this.caseBook.Case.CenterId) {
                localPeaceMakerOptionsList.push({
                    value: this.peaceMakersList[i].PeaceMakerId.toString(),
                    label: this.peaceMakersList[i].FirstName + ' ' + this.peaceMakersList[i].LastName
                });
            }
        }
        this.peaceMakerOptionsList = localPeaceMakerOptionsList;
        /* getPeacemaker - ends */

        /* getCounselor - starts */
        var localCounselorOptionsList = new Array<IOption>();
        this.counselorsList = JSON.parse(localStorage.getItem("getAllCounselors"));
        for (var i = 0; i < this.counselorsList.length; i++) {
            if (this.counselorsList[i].CenterId == this.caseBook.Case.CenterId || this.counselorsList[i].IsGlobal) {
                localCounselorOptionsList.push({
                    value: this.counselorsList[i].CounselorId.toString(),
                    label: this.counselorsList[i].FirstName + ' ' + this.counselorsList[i].LastName
                });
            }
        }
        this.counselorOptionsList = localCounselorOptionsList;
        /* getCounselor - ends */

        /* getAllCenters - starts */
        this.centerList = JSON.parse(localStorage.getItem("getAllCenters"));
        var localCenterOptionList = new Array<IOption>();
        for (var i = 0; i < this.centerList.length; i++) {
            localCenterOptionList.push({
                value: this.centerList[i].CenterId.toString(),
                label: this.centerList[i].Title
            });
        }
        this.centerOptionList = localCenterOptionList;
        /* getAllCenters - ends */

        /*getAllStates - starts*/
        this.statesList = JSON.parse(localStorage.getItem("getAllStates"))
        var localStatesOptionList = new Array<IOption>();
        for (var i = 0; i < this.statesList.length; i++) {
            localStatesOptionList.push({
                value: this.statesList[i].StateId.toString(),
                label: this.statesList[i].Title
            });
        }
        this.stateOptionsList = localStatesOptionList;
        /*getAllStates - ends*/

        this.loadPrimayCaseTab();
        this.isPrimaryDataLoaded = true;
    }

    public onCenterSelected(center: any) {
        if (this.caseBook.Case.CenterId == null || this.caseBook.Case.CenterId <= 0) {
            this.peaceMakerOptionsList = new Array<IOption>();
            this.counselorOptionsList = new Array<IOption>();
            return;
        }

        //Peace Maker
        var localPeaceMakerOptionsList = new Array<IOption>();
        for (var i = 0; i < this.peaceMakersList.length; i++) {
            if (this.peaceMakersList[i].CenterId == center.value) {
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
            if (this.counselorsList[i].CenterId == center.value || this.counselorsList[i].IsGlobal) {
                localCounselorOptionsList.push({
                    value: this.counselorsList[i].CounselorId.toString(),
                    label: this.counselorsList[i].FirstName + ' ' + this.counselorsList[i].LastName
                });
            }
        }
        this.counselorOptionsList = localCounselorOptionsList;
    }

    public onCenterDeselected() {

        this.peaceMakerOptionsList = new Array<IOption>();
        this.counselorOptionsList = new Array<IOption>();

        this.casePrimaryForm.controls['PeaceMakerId'].reset();
        this.casePrimaryForm.controls['CounselorId'].reset();
    }

    private loadPrimayCaseTab() {
        this.casePrimaryForm = this.fb.group({
            CenterId: [this.caseBook.Case.CenterId.toString(), Validators.required],
            PeaceMakerId: [this.caseBook.Case.PeaceMakerId.toString(), Validators.required],
            CounselorId: [this.caseBook.Case.CounselorId.toString(), Validators.required],

            ClientFirstName: [this.caseBook.Case.ClientFirstName, Validators.required],
            ClientLastName: [this.caseBook.Case.ClientLastName, Validators.required],
            FatherName: [this.caseBook.Case.FatherName, Validators.required],
            Mi: [this.caseBook.Case.Mi],
            GenderLookupId: [this.caseBook.Case.GenderLookupId.toString(), Validators.required],

            MaritalStatusLookupId: [this.caseBook.Case.MaritalStatusLookupId.toString(), Validators.required],
            RequireAssistanceLookupId: [this.caseBook.Case.RequireAssistanceLookupId.toString(), Validators.required],
            Remarks: [this.caseBook.Case.Remarks],
            MobileNumber: [this.caseBook.Case.MobileNumber, [Validators.required, Validators.minLength(10), this.validationService.mobileValidator]],
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
        caseBookNew.Case.RequireAssistanceLookupId = this.casePrimaryForm.controls['RequireAssistanceLookupId'].value;
        caseBookNew.Case.Remarks = this.casePrimaryForm.controls['Remarks'].value;
        caseBookNew.Case.MobileNumber = this.casePrimaryForm.controls['MobileNumber'].value;

        this.casesService.updatePrimaryInfo(caseBookNew).subscribe(
            data => {
                this.toastr.success('Primary Info Updated Successfully');
            },
            (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }

    /*Start of - Addresses*/

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
        let addressObject = new CaseAddress();
        addressObject.CaseId = this.caseBook.Case.CaseId;
                
        this.caseAddressForm = this.fb.group({
            Address: ['', Validators.required],
            Area: ['', Validators.required],
            PIN: ['', [Validators.required, Validators.minLength(6), this.validationService.numericValidator]],
            StateId: ['', Validators.required],
            CityId: ['', Validators.required]
        });

        this.caseBook.SelectedAddress = addressObject;

        this.addressModal.show();
    }

    public editAddress(address: vCaseAddress) {
        let addressObject = new CaseAddress();
        addressObject.CaseAddressId = address.CaseAddressId;
        addressObject.CaseId = address.CaseId;
        addressObject.Address = address.Address;
        addressObject.Area = address.Area;
        addressObject.CityId = address.CityId;
        addressObject.StateId = address.StateId;
        addressObject.PIN = address.PIN;
        addressObject.CreatedBy = address.CreatedBy;
        addressObject.CreatedDateTime = address.CreatedDateTime;
        addressObject.ModifiedBy = address.ModifiedBy;
        addressObject.ModifiedDatetime = address.ModifiedDatetime;

        this.onStateSelected({ value: address.StateId });

        this.caseBook.SelectedAddress = addressObject;
        
        this.caseAddressForm = this.fb.group({
            Address: [addressObject.Address, Validators.required],
            Area: [addressObject.Area, Validators.required],
            PIN: [addressObject.PIN, [Validators.required, Validators.minLength(6), this.validationService.numericValidator]],
            StateId: [addressObject.StateId.toString(), Validators.required],
            CityId: [addressObject.CityId.toString(), Validators.required]
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

        this.casesService.updateAddress(this.caseBook).subscribe(
            data => {
                this.addressModal.hide();

                let selectedAddressId = this.caseBook.SelectedAddress.CaseAddressId;

                selectedAddressId == undefined ?
                    this.caseBook.vAddresses.push(data) :
                    this.caseBook.vAddresses[this.caseBook.vAddresses.findIndex(address => address.CaseAddressId == selectedAddressId)] = data

                this.toastr.success('Address updated successfully');
            },
            (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            }
        );
    }
    /* End of - Addresses */  
}
