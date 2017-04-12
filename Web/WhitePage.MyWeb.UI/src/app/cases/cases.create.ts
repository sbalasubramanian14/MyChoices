import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { SelectModule, IOption } from 'ng-select';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

import { CasesService } from '../services/cases.services';
import { CommonService } from '../services/common.services';
import { CaseBook, Case, CaseAddress, vCaseAddress, CaseChildren, vCaseChildren } from '../models/case.entities';
import { BaseCaseController } from './basecase.controller';

@Component({
    templateUrl: 'cases.create.html',
    styleUrls: ['cases.create.scss']
})
export class CasesCreateComponent extends BaseCaseController implements OnInit {

    constructor(private fb: FormBuilder,
        public casesService: CasesService,
        public commonService: CommonService,
        private routerObj: Router,
        public toastr: ToastsManager,
        vRef: ViewContainerRef) {
        super(casesService, commonService);
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
                    break;
                case "Lookups":
                    this.genderLookupOptionsList = this.ParseLookups("Gender");
                    this.maritalStatusLookupOptionsList = this.ParseLookups("MaritalStatus");
                    this.requireAssistanceLookupOptionsList = this.ParseLookups("RequiredAssistance");
                    this.isDataLoaded = true;
                    break;
                default:
                    break;
            }
        });
    }

    public casePrimaryForm: FormGroup;
    public router: Router;
    public isDataLoaded = false;

    public caseBook: CaseBook;

    public centerOptionList: Array<IOption> = [];
    public peaceMakerOptionsList: Array<IOption> = [];
    public counselorOptionsList: Array<IOption> = [];
    public stateOptionsList: Array<IOption> = [];
    public cityOptionsList: Array<IOption> = [];

    public genderLookupOptionsList: Array<IOption> = [];
    public maritalStatusLookupOptionsList: Array<IOption> = [];
    public requireAssistanceLookupOptionsList: Array<IOption> = [];

    private onStateSelected(state: any) {
        if (this.caseBook.SelectedAddress.StateId == null || this.caseBook.SelectedAddress.StateId <= 0) {
            this.cityOptionsList = new Array<IOption>();
            return;
        }

        //Cities
        var localCityOptionsList = new Array<IOption>();
        for (var i = 0; i < this.statesList.length; i++) {
            if (this.statesList[i].StateId == this.caseBook.SelectedAddress.StateId) {
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

    ngOnInit() {
        this.caseBook = new CaseBook();
        this.caseBook.Case = new Case();
        //this.caseBook.Case.MaritalStatusLookupId = "4";

        this.caseBook.SelectedAddress = new CaseAddress();
        this.caseBook.vCaseAddress = new Array<vCaseAddress>();

        this.casePrimaryForm = this.fb.group({
            primaryInfo: new FormGroup({
                CenterId: new FormControl(this.caseBook.Case.CenterId, Validators.required),
                PeaceMakerId: new FormControl(this.caseBook.Case.PeaceMakerId, Validators.required),
                CounselorId: new FormControl(this.caseBook.Case.CounselorId, Validators.required),

                ClientFirstName: new FormControl(this.caseBook.Case.ClientFirstName, Validators.required),
                ClientLastName: new FormControl(this.caseBook.Case.ClientLastName, Validators.required),
                FatherName: new FormControl(this.caseBook.Case.FatherName, Validators.required),
                Mi: new FormControl(this.caseBook.Case.Mi),
                GenderLookupId: new FormControl(this.caseBook.Case.GenderLookupId, Validators.required),

                MaritalStatusLookupId: new FormControl(this.caseBook.Case.MaritalStatusLookupId, Validators.required),
                RequireAssistanceLookupId: new FormControl(this.caseBook.Case.RequireAssistanceLookupId, Validators.required),
                Remarks: new FormControl(this.caseBook.Case.Remarks),
                MobileNumber: new FormControl(this.caseBook.Case.MobileNumber, Validators.required)
            }),
            address: new FormGroup({
                Address: new FormControl(this.caseBook.SelectedAddress.Address, Validators.required),
                Area: new FormControl(this.caseBook.SelectedAddress.Area, Validators.required),
                PIN: new FormControl(this.caseBook.SelectedAddress.PIN, Validators.required),
                StateId: new FormControl(this.caseBook.SelectedAddress.StateId, Validators.required),
                CityId: new FormControl(this.caseBook.SelectedAddress.CityId, Validators.required)
            })
        });

        //Load default values
        this.caseBook.Case.MaritalStatusLookupId = "4";
        //this.casePrimaryForm.get('primaryInfo').get('MaritalStatusLookupId').setValue("4");

    }

    onCaseSave() {
        this.casesService
            .addCasePrimary(this.caseBook).subscribe(data => {
                this.toastr.success(data.CaseNumber + ' has been created successfully');
                this.router.navigate(['/cases/list']);                

            }, (error: any) => {
                this.toastr.success("Error while creating case, " + error);
            });
    }

}
