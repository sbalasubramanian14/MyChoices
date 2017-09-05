import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';

import { CaseBook, Case, CaseAddress, vCaseAddress } from '../../models/case.entities';

import { ValidationService } from '../../services/validation.service';
import { CasesService } from '../../services/cases.services';

import { SelectModule, IOption } from 'ng-select';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

import { ModalDirective } from 'ng2-bootstrap/modal';

import { Center, PeaceMaker, Counselor, Lookup } from '../../models/entities';

import { BaseCaseController } from './../basecase.controller';

import * as moment from 'moment';

@Component({
    selector: 'primaryCase',
    templateUrl: 'primary_case.component.html',
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

    public centerOptionList: Array<IOption> = [];
    public peaceMakerOptionsList: Array<IOption> = [];
    public counselorOptionsList: Array<IOption> = [];
    public genderLookupOptionsList: Array<IOption> = [];
    public maritalStatusLookupOptionsList: Array<IOption> = [];
    public requireAssistanceLookupOptionsList: Array<IOption> = [];

    constructor(public fb: FormBuilder,
        public validationService: ValidationService,
        public casesService: CasesService,
        public toastr: ToastsManager) {
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

        this.loadPrimayCaseTab();
        this.isPrimaryDataLoaded = true;
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
   
    /* Primary Info */
    public caseStatusOptionList: Array<IOption> = [];
    public stateOptionsList: Array<IOption> = [];
    public cityOptionsList: Array<IOption> = [];

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
    

    @ViewChild('addressModal') public addressModal: ModalDirective;

    public addNewAddress() {
        this.caseBook.SelectedAddress = new CaseAddress();
        this.caseBook.SelectedAddress.CaseId = this.caseBook.Case.CaseId;

        this.caseAddressForm = this.fb.group({
            Address: [this.caseBook.SelectedAddress.Address, Validators.required],
            Area: [this.caseBook.SelectedAddress.Area, Validators.required],
            PIN: [this.caseBook.SelectedAddress.PIN, Validators.required, Validators.minLength(6), this.validationService.numericValidator],
            StateId: [this.caseBook.SelectedAddress.StateId == undefined ? null : this.caseBook.SelectedAddress.StateId.toString(), Validators.required],
            CityId: [this.caseBook.SelectedAddress.CityId == undefined ? null : this.caseBook.SelectedAddress.CityId.toString(), Validators.required]
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

        this.caseAddressForm = this.fb.group({
            Address: [this.caseBook.SelectedAddress.Address, Validators.required],
            Area: [this.caseBook.SelectedAddress.Area, Validators.required],
            PIN: [this.caseBook.SelectedAddress.PIN, Validators.required, Validators.minLength(6), this.validationService.numericValidator],
            StateId: [this.caseBook.SelectedAddress.StateId.toString(), Validators.required],
            CityId: [this.caseBook.SelectedAddress.CityId.toString(), Validators.required]
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
            }, (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }
    /* End of - Addresses */  
}
