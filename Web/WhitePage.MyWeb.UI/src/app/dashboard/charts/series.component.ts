import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardModule } from '../dashboard.module';

@Component({
    selector: 'series-chart',
    templateUrl: 'series.component.html'
})

export class SeriesComponent implements OnInit {
    constructor() {
        this.options = {
            chart: {
                type: 'line',
                backgroundColor: "#abb0ba"
            },
            title: { text: 'Series Chart' },
            series: [{
                name: 'John',
                data: [5, 3, 4, 7, 2]
            }, {
                name: 'Jane',
                data: [2, 2, 3, 2, 1]
            }, {
                name: 'Joe',
                data: [3, 4, 4, 2, 5]
            }]
        };
    }

    public options: Object;

    ngOnInit(): void{
    }
};