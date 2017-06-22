import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardModule } from './dashboard.module';

import { ColumnComponent } from './charts/column.component'
import { SeriesComponent } from './charts/series.component'
import { BarComponent } from './charts/bar.component'
import { TotalNewCasesComponenet } from './charts/total_new_cases.component'

import { CasesService } from '../services/cases.services';
import { CommonService } from '../services/common.services';
import { ChartsService } from '../services/charts.services';

import { Case } from '../models/case.entities'

@Component({
    selector: 'charts',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss'],
    providers: [ColumnComponent, SeriesComponent, BarComponent, TotalNewCasesComponenet, CasesService, CommonService, ChartsService]
})

export class DashboardComponent implements OnInit {
    public currentOptions: any;
    public columnOptions: any;
    public seriesOptions: any;
    public breakdownTypes: any;
    public component: any;
    public isChartLoaded: boolean;

    constructor(public currentColumnOptions: ColumnComponent,
        public currentSeriesOptions: SeriesComponent,
        public currentBarOprtion: BarComponent,
        public currentNewChart: TotalNewCasesComponenet)
    {
        this.isChartLoaded = false;
        this.breakdownTypes = [{ id: 1, value: 'Monthly' }, { id: 2, value: 'Quarterly' }, { id: 3, value: "Yearly" }]
    };

    ngOnInit(): void { 
    };

    public loadChart(chartName: any) {
        switch (chartName) {
            case "Monthly": {
                this.currentNewChart.options = this.currentNewChart.monthlyOptions;
                break;
            }
            case "Quarterly": {
                console.log(this.currentNewChart.options)
                this.currentNewChart.options = this.currentNewChart.quaterlyOptions;
                console.log(this.currentNewChart.options)
                break;
            }
            case "Yearly": {
                console.log(this.currentNewChart.options);
                this.currentNewChart.options = this.currentNewChart.yearlyOptions;
                console.log(this.currentNewChart.yearlyOptions);
            }
            default:
                break;
        }
    }
}
