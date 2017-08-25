import { Component, Input, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { SelectModule, IOption } from 'ng-select';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { ModalDirective } from 'ng2-bootstrap/modal';

import * as moment from 'moment';

@Component({
    templateUrl: 'cases.detailed.html',
})

export class PrimaryInfoComponent {
    private selectedCaseId: number;

    public casePrimaryForm: FormGroup;
    public caseAddressForm: FormGroup;

    public router: Router;
    public isPrimaryDataLoaded: boolean = false;

    constructor(public fb: FormBuilder,
        public routerObj: Router,
        public toastr: ToastsManager,
        public vRef: ViewContainerRef,
        public activatedRoute: ActivatedRoute);

        this.isPrimaryDataLoaded = false;

        this.router = routerObj;
        this.toastr.setRootViewContainerRef(vRef);        
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
            MobileNumber: new FormControl(this.caseBook.Case.MobileNumber, [Validators.required, Validators.minLength(10), this.validationService.mobileValidator]),
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
            Address: new FormControl(this.caseBook.SelectedAddress.Address, Validators.required),
            Area: new FormControl(this.caseBook.SelectedAddress.Area, Validators.required),
            PIN: new FormControl(this.caseBook.SelectedAddress.PIN, [Validators.required, Validators.minLength(6), this.validationService.numericValidator]),
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

        console.log({ value: address.StateId });
        this.caseAddressForm = this.fb.group({
            Address: new FormControl(this.caseBook.SelectedAddress.Address, Validators.required),
            Area: new FormControl(this.caseBook.SelectedAddress.Area, Validators.required),
            PIN: new FormControl(this.caseBook.SelectedAddress.PIN, [Validators.required, Validators.minLength(6), this.validationService.numericValidator]),
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
            }, (error: any) => {
                this.toastr.error("Error while updating case, " + error);
            });
    }
    /* End of - Addresses */  
}
