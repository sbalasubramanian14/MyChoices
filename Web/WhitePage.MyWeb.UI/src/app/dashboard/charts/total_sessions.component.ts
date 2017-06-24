import { Component } from '@angular/core'
import { CaseBook } from '../../models/case.entities'
import { BaseCaseController } from '../../cases/basecase.controller';
import { CasesService } from '../../services/cases.services';
import { CommonService } from '../../services/common.services';
import { ChartsService } from '../../services/charts.services';

import * as _ from 'lodash';

@Component({
    selector: 'total_sessions',
    templateUrl: 'total_sessions.component.html',
    providers: [CaseBook, CasesService, CommonService, ChartsService]
}
)

export class TotalSessionsComponent extends BaseCaseController {
    public caseModel: CaseBook;
    public centers: string;
    public isCenterChartLoaded: boolean;
    public isCounselorChartLoaded: boolean;
    public isPeaceMakerChartLoaded: boolean;
    public breakdownTypes: any;
    public quarter1 = ["January", "February", "March"];
    public quarter2 = ["April", "May", "June"]
    public quarter3 = ["July", "August", "September"]
    public quarter4 = ["October", "November", "December"]

    public quarter1Data = 0;
    public quarter2Data = 0;
    public quarter3Data = 0;
    public quarter4Data = 0;
    public totalData = 0;

    constructor(caseService: CasesService, commonService: CommonService, chartsService: ChartsService) {
        super(caseService, commonService, chartsService);
        this.getCenterChartsData("TotalNoOfSessionsLookupId", "SessionsCenterWise");
        this.getCounselorChartsData("TotalNoOfSessionsLookupId", "SessionsCounselorWise");
        this.getPeacemakerChartsData("TotalNoOfSessionsLookupId", "SessionsPeacemakerWise");
        this.breakdownTypes = [{ id: 1, value: 'Monthly' }, { id: 2, value: 'Quarterly' }, { id: 3, value: "Yearly" }]
        this.observerDataSubject.subscribe(data => {
            switch (data) {
                case "SessionsCenterWise":
                    var monthlyOptionsList = [];
                    var quarterlyOptionsList = []
                    var yearlyOptionsList = [];

                    var mergedList = _.mapValues(_.groupBy(this.centerChartObjectsList, 'Key'), olist => olist.map(obj => _.omit(obj, 'Key')));

                    var categoriesArray = _.keys(mergedList);
                    var valuesArray = _.values(mergedList);

                    for (var objectArray of valuesArray) {
                        var monthlyObject = []
                        var quarterlyObject;
                        var yearlyObject;

                        for (var object of objectArray) {
                            var key = _.get(_.get(object, 'Value'), 'Key');
                            var value = _.get(_.get(object, 'Value'), 'Value');

                            monthlyObject.push(new Array(key, value));
                            quarterlyObject = this.returnQuarterlyData(key.toString(), Number(value));
                            yearlyObject = this.returnYearlyData(Number(value));
                        }

                        monthlyOptionsList.push({ name: categoriesArray[valuesArray.indexOf(objectArray)], data: monthlyObject });
                        quarterlyOptionsList.push({ name: categoriesArray[valuesArray.indexOf(objectArray)], data: new Array(quarterlyObject) });
                        yearlyOptionsList.push({ name: categoriesArray[valuesArray.indexOf(objectArray)], data: new Array(yearlyObject) });

                        this.quarter1Data = 0;
                        this.quarter2Data = 0;
                        this.quarter3Data = 0;
                        this.quarter4Data = 0;
                        this.totalData = 0;
                    }

                    this.centerMonthlyOptions = {
                        xAxis: { type: "category" },
                        yAxis: { allowDecimals: false, title: { text: "Number Of Cases" } },
                        title: { text: 'Total Number Of Sessions - Center-wise' },
                        chart: { type: 'column', backgroundColor: "#abb0ba" },
                        series: monthlyOptionsList
                    };

                    this.centerQuaterlyOptions = {
                        xAxis: { type: "category" },
                        yAxis: { allowDecimals: false, title: { text: "Number Of Cases" } },
                        title: { text: 'Total Number Of Sessions - Center-wise' },
                        chart: { type: 'column', backgroundColor: "#abb0ba" },
                        series: quarterlyOptionsList
                    };

                    this.centerYearlyOptions = {
                        xAxis: { type: "category" },
                        yAxis: { allowDecimals: false, title: { text: "Number Of Cases" } },
                        title: { text: 'Total Number Of Sessions - Center-wise' },
                        chart: { type: 'column', backgroundColor: "#abb0ba" },
                        series: yearlyOptionsList
                    };
                    this.isCenterChartLoaded = true;
                    this.centerOptions = this.centerMonthlyOptions;
                    break;
                case "SessionsCounselorWise":
                    var monthlyOptionsList = [];
                    var quarterlyOptionsList = []
                    var yearlyOptionsList = [];

                    var mergedList = _.mapValues(_.groupBy(this.counselorChartObjectsList, 'Key'), olist => olist.map(obj => _.omit(obj, 'Key')));

                    var categoriesArray = _.keys(mergedList);
                    var valuesArray = _.values(mergedList);

                    for (var objectArray of valuesArray) {
                        var monthlyObject = []
                        var quarterlyObject;
                        var yearlyObject;

                        for (var object of objectArray) {
                            var key = _.get(_.get(object, 'Value'), 'Key');
                            var value = _.get(_.get(object, 'Value'), 'Value');

                            monthlyObject.push(new Array(key, value));
                            quarterlyObject = this.returnQuarterlyData(key.toString(), Number(value));
                            yearlyObject = this.returnYearlyData(Number(value));
                        }

                        monthlyOptionsList.push({ name: categoriesArray[valuesArray.indexOf(objectArray)], data: monthlyObject });
                        quarterlyOptionsList.push({ name: categoriesArray[valuesArray.indexOf(objectArray)], data: new Array(quarterlyObject) });
                        yearlyOptionsList.push({ name: categoriesArray[valuesArray.indexOf(objectArray)], data: new Array(yearlyObject) });

                        this.quarter1Data = 0;
                        this.quarter2Data = 0;
                        this.quarter3Data = 0;
                        this.quarter4Data = 0;
                        this.totalData = 0;
                    }

                    this.counselorMonthlyOptions = {
                        xAxis: { type: "category" },
                        yAxis: { allowDecimals: false, title: { text: "Number Of Cases" } },
                        title: { text: 'Total Number Of Sessions - Counselor-wise' },
                        chart: { type: 'column', backgroundColor: "#abb0ba" },
                        series: monthlyOptionsList
                    };

                    this.counselorQuaterlyOptions = {
                        xAxis: { type: "category" },
                        yAxis: { allowDecimals: false, title: { text: "Number Of Cases" } },
                        title: { text: 'Total Number Of Sessions - Counselor-wise' },
                        chart: { type: 'column', backgroundColor: "#abb0ba" },
                        series: quarterlyOptionsList
                    };

                    this.counselorYearlyOptions = {
                        xAxis: { type: "category" },
                        yAxis: { allowDecimals: false, title: { text: "Number Of Cases" } },
                        title: { text: 'Total Number Of Sessions - Counselor-wise' },
                        chart: { type: 'column', backgroundColor: "#abb0ba" },
                        series: yearlyOptionsList
                    };
                    this.counselorOptions = this.counselorMonthlyOptions;
                    this.isCounselorChartLoaded = true;
                    break;
                case "SessionsPeacemakerWise":
                    var monthlyOptionsList = [];
                    var quarterlyOptionsList = []
                    var yearlyOptionsList = [];

                    var mergedList = _.mapValues(_.groupBy(this.peacemakerChartObjectsList, 'Key'), olist => olist.map(obj => _.omit(obj, 'Key')));

                    var categoriesArray = _.keys(mergedList);
                    var valuesArray = _.values(mergedList);

                    for (var objectArray of valuesArray) {
                        var monthlyObject = []
                        var quarterlyObject;
                        var yearlyObject;

                        for (var object of objectArray) {
                            var key = _.get(_.get(object, 'Value'), 'Key');
                            var value = _.get(_.get(object, 'Value'), 'Value');

                            monthlyObject.push(new Array(key, value));
                            quarterlyObject = this.returnQuarterlyData(key.toString(), Number(value));
                            yearlyObject = this.returnYearlyData(Number(value));
                        }

                        monthlyOptionsList.push({ name: categoriesArray[valuesArray.indexOf(objectArray)], data: monthlyObject });
                        quarterlyOptionsList.push({ name: categoriesArray[valuesArray.indexOf(objectArray)], data: new Array(quarterlyObject) });
                        yearlyOptionsList.push({ name: categoriesArray[valuesArray.indexOf(objectArray)], data: new Array(yearlyObject) });

                        this.quarter1Data = 0;
                        this.quarter2Data = 0;
                        this.quarter3Data = 0;
                        this.quarter4Data = 0;
                        this.totalData = 0;
                    }

                    this.peacemakerMonthlyOptions = {
                        xAxis: { type: "category" },
                        yAxis: { allowDecimals: false, title: { text: "Number Of Cases" } },
                        title: { text: 'Total Number Of Sessions - Peacemaker-wise' },
                        chart: { type: 'column', backgroundColor: "#abb0ba" },
                        series: monthlyOptionsList
                    };

                    this.peacemakerQuaterlyOptions = {
                        xAxis: { type: "category" },
                        yAxis: { allowDecimals: false, title: { text: "Number Of Cases" } },
                        title: { text: 'Total Number Of Sessions - Peacemaker-wise' },
                        chart: { type: 'column', backgroundColor: "#abb0ba" },
                        series: quarterlyOptionsList
                    };

                    this.peacemakerYearlyOptions = {
                        xAxis: { type: "category" },
                        yAxis: { allowDecimals: false, title: { text: "Number Of Cases" } },
                        title: { text: 'Total Number Of Sessions - Peacemaker-wise' },
                        chart: { type: 'column', backgroundColor: "#abb0ba" },
                        series: yearlyOptionsList
                    };
                    this.peacemakerOptions = this.peacemakerMonthlyOptions;
                    this.isPeaceMakerChartLoaded = true;
                    break;
                default:
                    break;
            }
        });
    };

    returnQuarterlyData(key: string, data: number) {

        if (this.quarter1.includes(key.toString())) {
            this.quarter1Data = data + this.quarter1Data;
            return ["Quarter1", this.quarter1Data]
        }
        else if (this.quarter2.includes(key.toString())) {
            this.quarter2Data = data + this.quarter2Data;
            return ["Quarter2", this.quarter2Data]
        }
        else if (this.quarter3.includes(key.toString())) {
            this.quarter3Data = data + this.quarter3Data;
            return ["Quarter3", this.quarter3Data]
        }
        else {
            this.quarter4Data = data + this.quarter4Data;
            return ["Quarter4", this.quarter4Data]
        }
    }

    returnYearlyData(data: number) {
        this.totalData = this.totalData + data
        return ["2017", this.totalData];
    }

    public loadCenterNewCasesChart(chartName: any) {
        switch (chartName) {
            case "Monthly": {
                this.centerOptions = this.centerMonthlyOptions;
                break;
            }
            case "Quarterly": {
                this.centerOptions = this.centerQuaterlyOptions;
                break;
            }
            case "Yearly": {
                this.centerOptions = this.centerYearlyOptions;
            }
            default:
                break;
        }
    }

    public loadCounselorNewCasesChart(chartName: any) {
        switch (chartName) {
            case "Monthly": {
                this.counselorOptions = this.counselorMonthlyOptions;
                break;
            }
            case "Quarterly": {
                this.counselorOptions = this.counselorQuaterlyOptions;
                break;
            }
            case "Yearly": {
                this.counselorOptions = this.counselorYearlyOptions;
            }
            default:
                break;
        }
    }

    public loadPeaceMakerNewCasesChart(chartName: any) {
        switch (chartName) {
            case "Monthly": {
                this.peacemakerOptions = this.peacemakerMonthlyOptions;
                break;
            }
            case "Quarterly": {
                this.peacemakerOptions = this.peacemakerQuaterlyOptions;
                break;
            }
            case "Yearly": {
                this.peacemakerOptions = this.peacemakerYearlyOptions;
            }
            default:
                break;
        }
    }

    public centerMonthlyOptions: Object;
    public centerQuaterlyOptions: Object;
    public centerYearlyOptions: Object;
    public counselorMonthlyOptions: Object;
    public counselorQuaterlyOptions: Object;
    public counselorYearlyOptions: Object;
    public peacemakerMonthlyOptions: Object;
    public peacemakerQuaterlyOptions: Object;
    public peacemakerYearlyOptions: Object;
    public centerOptions: Object;
    public counselorOptions: Object;
    public peacemakerOptions: Object;
}