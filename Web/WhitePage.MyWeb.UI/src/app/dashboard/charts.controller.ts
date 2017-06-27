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
export class ChartsController {
    constructor(public casesService: CasesService,
        public commonService: CommonService,
        public chartsService: ChartsService) {

        this.observerDataSubject = new Subject<string>();
    }

    public centerWiseChartObjectsList: Array<ChartObject> = [];
    public counselorWiseChartObjectsList: Array<ChartObject> = [];
    public peacemakerWiseChartObjectsList: Array<ChartObject> = [];
    public centerChartObjectsList: Array<ChartObject> = [];
    public counselorChartObjectsList: Array<ChartObject> = [];
    public peacemakerChartObjectsList: Array<ChartObject> = [];

    public observerDataSubject: Subject<string>;    

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
}
