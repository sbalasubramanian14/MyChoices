import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { SelectModule, IOption } from 'ng-select';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

import { Case, CaseAddress, CaseBook } from '../models/case.entities';
import { CasesService } from '../services/cases.services';
import { CommonService } from '../services/common.services';
import { ChartsService } from '../services/charts.services'
import { Center, PeaceMaker, Counselor, Lookup, State, ChartObject, CaseStatus } from '../models/entities';

@Injectable()
export class BaseCaseController {
    constructor(public casesService: CasesService,
        public commonService: CommonService,
        public chartsService: ChartsService) {

        this.observerDataSubject = new Subject<string>();
        //console.log("calling super constructor");
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
    public centerWiseChartObjectsList: Array<ChartObject> = [];
    public counselorWiseChartObjectsList: Array<ChartObject> = [];
    public peacemakerWiseChartObjectsList: Array<ChartObject> = [];
    public centerChartObjectsList: Array<ChartObject> = [];
    public counselorChartObjectsList: Array<ChartObject> = [];
    public peacemakerChartObjectsList: Array<ChartObject> = [];

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

    public getCenterWiseChartsData(id: number, observer: string): any {
        this.chartsService.getCenterWiseChartsData(id).subscribe(data => {
            data.forEach(
                chartData =>
                    this.centerWiseChartObjectsList.push(chartData)
            );
            localStorage.setItem("getCenterWiseChartsData", JSON.stringify(this.centerWiseChartObjectsList));
            this.observerDataSubject.next(observer);
        });
    }

    public getCounselorWiseChartsData(id: number, observer: string): any {
        this.chartsService.getCounselorWiseChartsData(id).subscribe(data => {
            data.forEach(
                chartData =>
                    this.counselorWiseChartObjectsList.push(chartData)
            );
            localStorage.setItem("getCounselorWiseChartsData", JSON.stringify(this.counselorWiseChartObjectsList));
            this.observerDataSubject.next(observer);
        });
    }

    public getPeacemakerWiseChartsData(id: number, observer: string): any {
        this.chartsService.getPeacemakerWiseChartsData(id).subscribe(data => {
            data.forEach(
                chartData =>
                    this.peacemakerWiseChartObjectsList.push(chartData)
            );
            localStorage.setItem("getPeacemakerWiseChartsData", JSON.stringify(this.peacemakerWiseChartObjectsList));
            this.observerDataSubject.next(observer);
        });
    }

    public getCenterChartsData(column: string, observer: string): any {
        this.chartsService.getCenterChartsData(column).subscribe(data => {
            data.forEach(
                chartData =>
                    this.centerChartObjectsList.push(chartData)
            );
            localStorage.setItem("getCenterChartsData", JSON.stringify(this.centerChartObjectsList));
            this.observerDataSubject.next(observer);
        });
    }

    public getCounselorChartsData(column: string, observer: string): any {
        this.chartsService.getCounselorChartsData(column).subscribe(data => {
            data.forEach(
                chartData =>
                    this.counselorChartObjectsList.push(chartData)
            );
            localStorage.setItem("getCounselorChartsData", JSON.stringify(this.counselorChartObjectsList));
            this.observerDataSubject.next(observer);
        });
    }

    public getPeacemakerChartsData(column: string, observer: string): any {
        this.chartsService.getPeacemakerChartsData(column).subscribe(data => {
            data.forEach(
                chartData =>
                    this.peacemakerChartObjectsList.push(chartData)
            );
            localStorage.setItem("getPeacemakerChartsData", JSON.stringify(this.peacemakerChartObjectsList));
            this.observerDataSubject.next(observer);
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
            let testLookup = this.lookupsList.find(l => l.Title === lookupName);
            if (testLookup == undefined || testLookup == null) {
                console.log("failed - " + lookupName);
            }
            var lookupDetailsList = testLookup.LookupDetails;
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
