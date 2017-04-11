import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { SelectModule, IOption} from 'ng-select';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

import { CasesService } from '../services/cases.services';
import { CommonService } from '../services/common.services';
import { Case, CaseAddress, CaseBook} from '../models/case.entities';
import { BaseCaseController } from './basecase.controller';

@Component({
    templateUrl: 'cases.detailed.html'
})
export class CasesDetailedComponent extends BaseCaseController implements OnInit {

    public caseBook: CaseBook;
    private selectedCaseId: number;

    public casePrimaryForm: FormGroup;
    public caseAddressForm: FormGroup;

    public router: Router;
    public isPrimaryDataLoaded: boolean = false;
    constructor(public  fb: FormBuilder,
        public casesService: CasesService,
        public commonService: CommonService,
        public  routerObj: Router,
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
                    console.log("load centers");
                    this.isPrimaryDataLoaded = true;
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
                    break;
                default:
                    break;
            }
        });

    }

    ngOnInit() {
        console.log("calling ng");
        this.activatedRoute.params.subscribe((params: Params) => {
            this.selectedCaseId = params['id'];
            this.getCaseById();
        });
    }

    private getCaseById() {        
        this.casesService
            .GetCaseById(this.selectedCaseId)
            .subscribe(data => {
                this.caseBook = data;

                this.loadPrimayCaseTab();

                
            });
    }

    /* Primary Info */
    public centerOptionList: Array<IOption>;
    public peaceMakerOptionsList: Array<IOption>;
    public counselorOptionsList: Array<IOption>;
    public stateOptionsList: Array<IOption>;
    public cityOptionsList: Array<IOption>;

    public genderLookupOptionsList: Array<IOption>;
    public maritalStatusLookupOptionsList: Array<IOption>;
    public requireAssistanceLookupOptionsList: Array<IOption>;
    

    private loadPrimayCaseTab()
    {
        this.casePrimaryForm = this.fb.group({
            CenterId: new FormControl(this.caseBook.Case.CenterId, Validators.required),
            //PeaceMakerId: new FormControl(this.caseBook.Case.PeaceMakerId, Validators.required),
            //CounselorId: new FormControl(this.caseBook.Case.CounselorId, Validators.required),

            //ClientFirstName: new FormControl(this.caseBook.Case.ClientFirstName, Validators.required),
            //ClientLastName: new FormControl(this.caseBook.Case.ClientLastName, Validators.required),
            //FatherName: new FormControl(this.caseBook.Case.FatherName, Validators.required),
            //Mi: new FormControl(this.caseBook.Case.Mi),
            //GenderLookupId: new FormControl(this.caseBook.Case.GenderLookupId, Validators.required),

            //MaritalStatusLookupId: new FormControl(this.caseBook.Case.MaritalStatusLookupId, Validators.required),
            //RequireAssistanceLookupId: new FormControl(this.caseBook.Case.RequireAssistanceLookupId, Validators.required),
            //Remarks: new FormControl(this.caseBook.Case.Remarks),
            //MobileNumber: new FormControl(this.caseBook.Case.MobileNumber, Validators.required)
        });
    }

    /* End of --- Primary Info */
}
