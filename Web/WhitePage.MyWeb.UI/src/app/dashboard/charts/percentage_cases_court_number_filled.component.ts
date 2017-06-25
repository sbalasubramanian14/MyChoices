import { Component } from '@angular/core'
import { CaseBook } from '../../models/case.entities'
import { BaseCaseController } from '../../cases/basecase.controller';
import { CasesService } from '../../services/cases.services';
import { CommonService } from '../../services/common.services';
import { ChartsService } from '../../services/charts.services';
import { HighChartsThemeSettings } from './highcharts.theme';
import * as _ from 'lodash';

@Component({
    providers: [CaseBook, CasesService, CommonService, ChartsService]
})

export class PercentageCasesCourtNumberFilledComponent extends BaseCaseController {
    public caseModel: CaseBook;
    public centers: string;
    public isChartLoaded: boolean;
    public quarter1 = ["January", "February", "March"];
    public quarter2 = ["April", "May", "June"]
    public quarter3 = ["July", "August", "September"]
    public quarter4 = ["October", "November", "December"]

    public quarter1Data = 0;
    public quarter2Data = 0;
    public quarter3Data = 0;
    public quarter4Data = 0;
    public totalData = 0;

    public radioIndex = 69;

    constructor(caseService: CasesService, commonService: CommonService, chartsService: ChartsService) {
        super(caseService, commonService, chartsService);
        this.isChartLoaded = false;
        this.observerDataSubject.subscribe(data => {
            switch (data) {
                case "charts":
                    var monthlyOptionsList = [];
                    var quarterlyOptionsList = []
                    var yearlyOptionsList = [];

                    var mergedList = _.mapValues(_.groupBy(this.centerWiseChartObjectsList, 'Key'), olist => olist.map(obj => _.omit(obj, 'Key')));

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

                    this.monthlyOptions = {
                        xAxis: { type: "category" },
                        yAxis: { allowDecimals: false, title: { text: "Number Of Cases" } },
                        title: { text: 'Total Number Of New Cases - Center-wise' },
                        chart: HighChartsThemeSettings.columnChart,
                        series: monthlyOptionsList
                    };

                    this.quaterlyOptions = {
                        xAxis: { type: "category" },
                        yAxis: { allowDecimals: false, title: { text: "Number Of Cases" } },
                        title: { text: 'Total Number Of New Cases - Center-wise' },
                        chart: HighChartsThemeSettings.columnChart,
                        series: quarterlyOptionsList
                    };

                    this.yearlyOptions = {
                        xAxis: { type: "category" },
                        yAxis: { allowDecimals: false, title: { text: "Number Of Cases" } },
                        title: { text: 'Total Number Of New Cases - Center-wise' },
                        chart: HighChartsThemeSettings.columnChart,
                        series: yearlyOptionsList
                    };

                    this.options = this.monthlyOptions;
                    this.isChartLoaded = true;

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

    public monthlyOptions: Object;
    public quaterlyOptions: Object;
    public yearlyOptions: Object;
    public options: Object;
}