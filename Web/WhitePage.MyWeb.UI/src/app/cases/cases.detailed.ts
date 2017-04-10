import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { CasesService } from '../services/cases.services';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TabsModule } from "ng2-tabs";

@Component({
  templateUrl: 'cases.detailed.html'
})
export class CasesDetailedComponent implements OnInit {

    selectedCase: Object;
    selectedCaseId: number;

    public casePrimaryForm: FormGroup;
    public router: Router;

    public centersList: Array<any> = [
        { Value: "1", Text: "Lakdikapul" },
        { Value: "2", Text: "Falaknuma" },
        { Value: "3", Text: "Golconda" },
        { Value: "4", Text: "Secunderabad" },
        { Value: "5", Text: "Warangal" }
    ];

    public peaceMakersList: Array<any> = [
        { Value: "1", Text: "Louisa" }
    ];

    public counselorsList: Array<any> = [
        { Value: "1", Text: "Person 1" }
    ];

    public statesList: Array<any> = [
        { Value: "1", Text: "Telangana" }
    ];

    public citiesList: Array<any> = [
        { Value: "1", Text: "Hyderabad" }
    ];

    public gendersList: Array<any> = [
        { Value: "1", Text: "Female" },
        { Value: "2", Text: "Male" },
        { Value: "3", Text: "Other" }
    ];

    public maritalStatusesList: Array<any> = [
        { Value: "1", Text: "Married " },
        { Value: "2", Text: "Unmarried" },
        { Value: "3", Text: "Divorced" },
        { Value: "4", Text: "Widowed" },
        { Value: "5", Text: "Separated" }
    ];

    public reqAssistanceList: Array<any> = [
        { Value: "1", Text: "Yes" },
        { Value: "2", Text: "Maybe later" },
        { Value: "3", Text: "No, never" },
    ];

public caseStatusesList: Array<any> = [
        { Value: "1", Text: "New" }
    ];

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.selectedCaseId = params['id'];
            this.getCaseById();
        });
    }

    private getCaseById() {
        this.casePrimaryForm = this.fb.group({
            CenterId: [1, Validators.required],
            CounselorId: [1, Validators.required],
            PeaceMakerId: [1, Validators.required],

            FirstName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
            LastName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],
            Mi: [null],
            FatherName: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(50)])],

            GenderLookupId: [1, Validators.required],
            RequireAssistanceLookupId: [null, Validators.required],
            MaritalStatusLookupId: [null, Validators.required],

            Address: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(200)])],
            PIN: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])],
            StateId: [1, Validators.required],
            CityId: [1, Validators.required],
            Area: [null, Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(200)])],
            Mobile: [null, Validators.compose([Validators.required, CustomValidators.phone('en-US')])],

            Remarks: [null],

            CaseStatusId: [1, Validators.required],
        });
        this.casesService
            .GetCaseById(this.selectedCaseId)
            .subscribe(data => {
                this.selectedCase = data;
            });
    }

    constructor(private fb: FormBuilder, private casesService: CasesService, private routerObj: Router, private activatedRoute: ActivatedRoute) {
        this.router = routerObj;
    }
}
