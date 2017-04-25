import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SelectModule, IOption } from 'ng-select';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { Case, CaseAddress, CaseBook } from '../models/case.entities';
import { CasesService } from '../services/cases.services';
import { CommonService } from '../services/common.services';


@Injectable()
export class BaseCaseController {
    constructor(public casesService: CasesService,
        public commonService: CommonService) {

        this.observerDataSubject = new Subject<string>();
        console.log("calling super constructor");
        this.LoadCaseStatuses();
        this.LoadCenters();
        this.LoadPeaceMakers();
        this.LoadCounselors();
        this.LoadLookups();
        this.LoadStates();
        
    }

    public centersList: Array<Center> = [];    
    public peaceMakersList: Array<PeaceMaker> = [];
    public counselorsList: Array<Counselor> = [];
    public lookupsList: Array<Lookup> = [];
    public statesList: Array<State> = [];
    public caseStatusesList: Array<CaseStatus> = [];

    public observerDataSubject: Subject<string>;

    private LoadCenters(): any {
        this.commonService.getAllCenters().subscribe(data => {
            data.forEach(
                center =>
                    this.centersList.push(center)
            );
            localStorage.setItem("getAllCenters", JSON.stringify(this.centersList));
            this.observerDataSubject.next("Centers");
        });
    }

    private LoadPeaceMakers(): any {
        let peaceMakersListString: string = localStorage.getItem("getAllPeaceMakers");
        if (peaceMakersListString != null && peaceMakersListString != "[]") {
            this.peaceMakersList = JSON.parse(peaceMakersListString);
        }
        else {
            this.commonService.getAllPeaceMakers().subscribe(data => {
                data.forEach(
                    peaceMaker =>
                        this.peaceMakersList.push(peaceMaker)
                );
                localStorage.setItem("getAllPeaceMakers", JSON.stringify(this.peaceMakersList));
            });
        }
    }

    private LoadCounselors(): any {
        let counselorsListString: string = localStorage.getItem("getAllCounselors");
        if (counselorsListString != null && counselorsListString != "[]") {
            this.counselorsList = JSON.parse(counselorsListString);
        }
        else {
            this.commonService.getAllCounselors().subscribe(data => {
                data.forEach(
                    counselor =>
                        this.counselorsList.push(counselor)
                );
                localStorage.setItem("getAllCounselors", JSON.stringify(this.counselorsList));
            });
        }
    }

    private LoadLookups(): any {
        this.commonService.getAllLookups().subscribe(data => {
            data.forEach(
                lookup =>
                    this.lookupsList.push(lookup)
            );
            localStorage.setItem("getAllLookups", JSON.stringify(this.lookupsList));
            this.observerDataSubject.next("Lookups");
        });
    }

    private LoadCaseStatuses(): any {
        this.commonService.getAllCaseStatuses().subscribe(data => {
            data.forEach(
                caseStatus =>
                    this.caseStatusesList.push(caseStatus)
            );
            localStorage.setItem("getAllCaseStatuses", JSON.stringify(this.caseStatusesList));
            this.observerDataSubject.next("CaseStatuses");
        });
    }

    private LoadStates(): any {
        this.commonService.getAllStates().subscribe(data => {
            data.forEach(
                state => {
                    this.statesList.push(state);
                }
            );
            localStorage.setItem("getAllStates", JSON.stringify(this.statesList));
            this.observerDataSubject.next("States");
        });
    }

    public ParseLookups(lookupName: string): Array<IOption> {
        var localOptionsList = new Array<IOption>();

        if (this.lookupsList.filter(l => l.Title == lookupName) == undefined) {
            console.log(lookupName);
        }
        else {
            var lookupDetailsList = this.lookupsList.filter(l => l.Title == lookupName)[0].LookupDetails;
            for (var i = 0; i < lookupDetailsList.length; i++) {
                localOptionsList.push({
                    value: lookupDetailsList[i].LookupDetailId.toString(),
                    label: lookupDetailsList[i].Value
                });
            }
        }
        return localOptionsList;
    }

    public ParseMultiLookups(lookupName: string): Array<IMultiSelectOption> {
        var localOptionsList = new Array<IMultiSelectOption>();

        if (this.lookupsList.filter(l => l.Title == lookupName) == undefined) {
            console.log(lookupName);
            console.log("Not Found");
        }
        else {
            var lookupDetailsList = this.lookupsList.filter(l => l.Title == lookupName)[0].LookupDetails;
            for (var i = 0; i < lookupDetailsList.length; i++) {
                localOptionsList.push({
                    id: lookupDetailsList[i].LookupDetailId,
                    name: lookupDetailsList[i].Value
                });
            }
        }
        return localOptionsList;
    }
}
